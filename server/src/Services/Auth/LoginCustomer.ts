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
                return callback("Phone number not found", null);
            } else if (
                this._hashPassword.comparePassword(
                    data.password,
                    customer[0].Password as string
                ) === false
            ) {
                return callback("Password is incorrect", null);
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
            Log.Error(new Date(), "Server Error", "LoginCustomerService.ts");
            return callback(error, null);
        }
    }
}
