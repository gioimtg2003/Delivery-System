import { Employee } from "../../Lib/Types/Employee";
import { BaseLogin } from "./BaseLogin";
export class LoginAdmin extends BaseLogin {
    constructor() {
        super();
    }

    public login(email: string, password: string): boolean {
        this.conn.query(
            "SELECT id, Email, Password, Role FROM Employee WHERE Email = ?",
            [email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (result.length === 0) {
                    console.log("Email not found");
                    return false;
                }
                let employee: Employee = result[0];
                if (
                    this._hashPassword.comparePassword(
                        password,
                        employee?.Password as string
                    ) === false
                ) {
                    console.log("Password is incorrect");
                    return false;
                }
                this.handleToken(employee).then((data) => {
                    console.log(data);
                });
            }
        );

        return false;
    }
}
