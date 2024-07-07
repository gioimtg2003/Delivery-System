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
                "SELECT id, Email, Phone, Verify, Password FROM shippers WHERE Phone = ?",
                [data.phone]
            );
            if (shipper.length === 0) {
                return callback(null, {
                    error: true,
                    message: "Số điện thoại không tồn tại",
                    data: null,
                });
            } else if (
                this._hashPassword.comparePassword(
                    data.password,
                    shipper[0].Password as string
                ) === false
            ) {
                return callback(null, {
                    error: true,
                    message: "Mật khẩu không chính xác",
                    data: null,
                });
            } else if (shipper[0].Verify === 0) {
                let [identity] = await pool.execute<RowDataPacket[]>(
                    "SELECT idShipper FROM shipperidentity WHERE idShipper = ?",
                    [shipper[0].id]
                );
                if (identity.length === 0) {
                    return callback(null, {
                        error: true,
                        message: "need_upload_identity",
                        data: shipper[0].id,
                    });
                } else {
                    return callback(null, {
                        error: true,
                        message: "Bạn chưa được hệ thống xác minh tài khoản",
                        data: null,
                    });
                }
            } else {
                this.handleToken({ ...shipper[0], Role: "Shipper" }).then(
                    (tokenData) => {
                        console.log(tokenData);
                        return callback(null, {
                            error: false,
                            message: "Login success",
                            data: tokenData,
                        });
                    }
                );
            }
        } catch (error) {
            console.error(error);
            Log.Error(new Date(), error, "LoginShipper");
            return callback("Error while login", null);
        }
    }
}
