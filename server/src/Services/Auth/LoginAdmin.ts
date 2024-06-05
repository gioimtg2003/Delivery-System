import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IEmployee } from "../../Lib/Types/Employee";
import { Log } from "../../Lib/Utils/Log";
import { BaseLogin } from "./BaseLogin";

interface ILoginAdmin {
    readonly Email: string;
    readonly Password: string;
}

interface IResCallback {
    readonly error: boolean;
    readonly message: string;
    readonly data: any;
}

type IEmployeeRow = RowDataPacket & IEmployee;

export class LoginAdmin extends BaseLogin {
    constructor() {
        super();
    }

    public async login(
        data: ILoginAdmin,
        callback: ICallback<IResCallback>
    ): Promise<void> {
        try {
            const [user] = await pool.execute<IEmployeeRow[]>(
                "SELECT id, Email, Password, Role FROM employee WHERE Email = ?",
                [data.Email]
            );
            if (user.length === 0) {
                console.log("Email not found");
                return callback(null, {
                    error: true,
                    message: "Email not found",
                    data: null,
                });
            } else {
                const employee: IEmployee = user[0];
                if (
                    this._hashPassword.comparePassword(
                        data.Password,
                        employee?.Password as string
                    ) === false
                ) {
                    return callback(null, {
                        error: true,
                        message: "Password is incorrect",
                        data: null,
                    });
                }

                this.handleToken(employee).then((tokenData) => {
                    return callback(null, {
                        error: false,
                        message: "Login success",
                        data: tokenData,
                    });
                });
            }
        } catch (error) {
            Log.Error(new Date(), error, "LoginAdmin");
            return callback(error, null);
        }
    }
}
