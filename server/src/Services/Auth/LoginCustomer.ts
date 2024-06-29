import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { ICustomer } from "../../Lib/Types/Customer";
import { BaseLogin } from "./BaseLogin";
import { Log } from "../../Lib/Utils/Log";

interface IResCallback {
    readonly error: boolean;
    readonly message: string;
    readonly data: any;
}
export class LoginCustomer extends BaseLogin {
    async login(
        data: { phone: string; password: string },
        callback: ICallback<IResCallback>
    ): Promise<void> {
        try {
            let [customer] = await pool.execute<(ICustomer & RowDataPacket)[]>(
                "SELECT * FROM customers WHERE Phone = ?",
                [data.phone]
            );

            if (customer.length === 0) {
                return callback("account_not_found", null);
            } else if (
                this._hashPassword.comparePassword(
                    data.password,
                    customer[0].Password as string
                ) === false
            ) {
                return callback("password_is_incorrect", null);
            } else if (!customer[0].Verify) {
                return callback(null, {
                    error: false,
                    message: "Account is not verified",
                    data: "need_verify",
                });
            } else {
                this.handleToken(customer[0]).then((tokenData) => {
                    return callback(null, {
                        error: false,
                        message: "Login success",
                        data: tokenData,
                    });
                });
            }
        } catch (error) {
            console.error(error);
            Log.Error(new Date(), error, "LoginCustomerService.ts");
            return callback("Error when login", null);
        }
    }
}
