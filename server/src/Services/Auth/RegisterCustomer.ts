import { Log } from "../../Lib/Utils/Log";
import { HashPassword } from "../Hash";
import { ICallback } from "../../Lib/Types/Callback";
import pool from "../../Database/mysql";
import { ResultSetHeader } from "mysql2";
import { randomCode } from "../../Lib/Utils/randomCode";
import { convertTimeStamp } from "../../Lib/Utils/converTimeStamp";
import { CustomerEmailRegister } from "../Email/CustomerEmailRegister";

export class RegisterCustomer {
    private hashPassword: HashPassword;
    constructor() {
        this.hashPassword = new HashPassword();
    }

    async register(
        data: {
            Phone: string;
            Password: string;
            Email: string;
        },
        callback: ICallback<any>
    ): Promise<void> {
        data.Password = this.hashPassword.hashPassword(data.Password);
        try {
            const code = randomCode();
            console.log(data);
            let email = new CustomerEmailRegister(
                data.Email,
                data.Phone,
                Number(code)
            );
            let customer = await pool.execute<ResultSetHeader>(
                "insert into customers (Email, Password, Phone, OTP, ExpOTP) values (?, ?, ?, ?, ?)",
                [
                    data.Email,
                    data.Password,
                    data.Phone,
                    code,
                    convertTimeStamp(Date.now() + 60000 * 15),
                ]
            );
            if (customer[0].affectedRows > 0) {
                Log.Info(
                    new Date(),
                    "Success",
                    `Register customer with email: ${data.Email} - password: ${data.Password}`,
                    "RegisterCustomer"
                );
                email.sendEmail();
                callback(null, "Register success");
            } else {
                Log.Error(new Date(), "Failed", "RegisterCustomer");
                return callback("Lỗi trong khi đăng ký", null);
            }
        } catch (error: any) {
            console.error(error);
            if (error.code === "ER_DUP_ENTRY") {
                return callback("Số điện thoại hoặc email đã tồn tại", null);
            } else {
                Log.Error(new Date(), error, "RegisterCustomer");
                return callback("Lỗi trong khi đăng ký", null);
            }
        }
    }
}
