import { ICallback } from "../../Lib/Types/Callback";
import { IDataLogin } from "../../Lib/Types/IdataLogin";
import { BaseLogin } from "./BaseLogin";
import { Log } from "../../Lib/Utils/Log";
import { Customer } from "../../Lib/Types/Customer";
import { HashPassword } from "../Hash";
import { WelcomeCustomerLogin } from "../Email/WelcomeCustomerLogin";

export class LoginNormal extends BaseLogin {
    constructor() {
        super();
    }

    public async login(
        data: Customer,
        callback: ICallback<IDataLogin>
    ): Promise<void> {
        try {
            let start = process.hrtime();
            let { email, password } = data;
            let customer = await CustomerSchema.findOne({ email: email });
            if (customer) {
                if (customer.deleted) {
                    return callback(null, {
                        err: true,
                        msg: "Tài khoản không tồn tại hoặc đã bị xóa.",
                    });
                }
                if (!customer.check_verify_account) {
                    return callback(null, {
                        err: true,
                        msg: "Tài khoản chưa xác thực Email",
                    });
                }
                if (customer.credentials_type === "google") {
                    return callback(null, {
                        err: true,
                        msg: "Vui lòng chọn phương thức đăng nhập bằng Google cho tài khoản này!",
                    });
                }
                if (
                    this._hashPassword.comparePassword(
                        password,
                        customer.password
                    )
                ) {
                    let token = await this.handleToken(customer);
                    if (!customer?.welcome) {
                        customer.welcome = true;
                        customer.save();
                        let emailWelcome = new WelcomeCustomerLogin(
                            customer.email,
                            customer.name
                        );
                        emailWelcome.sendEmail();
                    }

                    Log.Info(
                        new Date(),
                        "Success",
                        `Login success id:: ${customer._id}`,
                        "LoginNormal"
                    );
                    return callback(null, token);
                } else {
                    return callback("Password is incorrect", null);
                }
            } else {
                return callback("Email is not exists", null);
            }
        } catch (error) {
            Log.Error(new Date(), error, "LoginNormal");
            return callback(error, null);
        }
    }
}
