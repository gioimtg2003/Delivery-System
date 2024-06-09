import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipper } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";
import { BaseLogin } from "./BaseLogin";

interface ILoginShipper {
    phone: string;
    password: string;
}
interface IResCallback {
    readonly error: boolean;
    readonly message: string;
    readonly data: any;
}
export class LoginShipper extends BaseLogin {
    public async Login(
        data: ILoginShipper,
        callback: ICallback<IResCallback>
    ): Promise<void> {
        try {
            let [shipper] = await pool.execute<(IShipper & RowDataPacket)[]>(
                "SELECT id, Email, Phone, Password FROM shippers WHERE Phone = ?",
                [data.phone]
            );
            if (shipper.length === 0) {
                return callback(null, {
                    error: true,
                    message: "Phone not found",
                    data: null,
                });
            } else {
                if (
                    this._hashPassword.comparePassword(
                        data.password,
                        shipper[0].Password as string
                    ) === false
                ) {
                    return callback(null, {
                        error: true,
                        message: "Password is incorrect",
                        data: null,
                    });
                } else {
                    this.handleToken(shipper[0]).then((tokenData) => {
                        console.log(tokenData);
                        return callback(null, {
                            error: false,
                            message: "Login success",
                            data: tokenData,
                        });
                    });
                }
            }
        } catch (error) {
            Log.Error(new Date(), error, "LoginShipper");
            return callback("Error while login", null);
        }
    }
}
