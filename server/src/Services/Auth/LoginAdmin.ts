import { ICallback } from "../../Lib/Types/Callback";
import { Employee } from "../../Lib/Types/Employee";
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
export class LoginAdmin extends BaseLogin {
    constructor() {
        super();
    }

    public login(data: ILoginAdmin, callback: ICallback<IResCallback>): void {
        this.conn.query(
            "SELECT id, Email, Password, Role FROM Employee WHERE Email = ?",
            [data.Email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                if (result.length === 0) {
                    console.log("Email not found");
                    return callback(null, {
                        error: true,
                        message: "Email not found",
                        data: null,
                    });
                }
                let employee: Employee = result[0];
                if (
                    this._hashPassword.comparePassword(
                        data.Password,
                        employee?.Password as string
                    ) === false
                ) {
                    console.log("Password is incorrect");
                    return callback(null, {
                        error: true,
                        message: "Password is incorrect",
                        data: null,
                    });
                }
                this.handleToken(employee).then((data) => {
                    return callback(null, {
                        error: false,
                        message: "Login success",
                        data: data,
                    });
                });
            }
        );
    }
}
