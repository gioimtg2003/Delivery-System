import { Customer } from "../../Lib/Types/Customer";
import { AuthRegisterService } from "../Interfaces/IAuthService";
import CustomerSchema from "../../Models/Customer";
import { Log } from "../../Lib/Utils/Log";
import { HashPassword } from "../Hash";
import { ICallback } from "../../Lib/Types/Callback";
import { CustomerEmailRegister } from "../Email/CustomerEmailRegister";

export class RegisterCustomer extends AuthRegisterService<
    Customer,
    ICallback<any>
> {
    private hashPassword: HashPassword;
    constructor() {
        super();
        this.hashPassword = new HashPassword();
    }

    async register(data: Customer, callback: ICallback<any>): Promise<void> {
        let start = process.hrtime();
        let { email } = data;
        data.password = this.hashPassword.hashPassword(data.password);
        try {
            if (await this.checkEmail(email)) {
                let customer = new CustomerSchema(data);
                let save_customer = await customer.save();
                Log.Info(
                    new Date(),
                    "Success",
                    `Register customer with email: ${email} - password: ${data.password}`,
                    "RegisterCustomer"
                );

                this.sendEmail(save_customer);
                if (save_customer) {
                    callback(null, "Register success");
                } else {
                    callback("Register failed", null);
                }
            } else {
                callback("Email already exists", null);
            }
        } catch (error) {
            Log.Error(new Date(), error, "RegisterCustomer");
            callback(error, null);
        }
        let end = process.hrtime(start);
        console.info("Execution time registerCustomer: %dms", end[1] / 1000000);
    }
    async sendEmail(data: Customer): Promise<void> {
        let email = new CustomerEmailRegister(
            data.email,
            data.shop_name,
            data.name,
            data.phone,
            data._id as string
        );
        email.sendEmail();
    }
    checkEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                CustomerSchema.findOne({ email: email })
                    .then((data) => {
                        if (data) {
                            resolve(false);
                        }
                        resolve(true);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}
