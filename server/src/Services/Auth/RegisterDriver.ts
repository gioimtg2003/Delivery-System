import { Driver } from "../../Lib/Types/Driver";
import { AuthRegisterService } from "../Interfaces/IAuthService";
import { HashPassword } from "../Hash";
import { Log } from "../../Lib/Utils/Log";
import DriverSchema from "../../Models/Driver";
import CustomerSchema from "../../Models/Customer";
import EmployeeSchema from "../../Models/Employee";
import { ICallback } from "../../Lib/Types/Callback";

export class RegisterDriver extends AuthRegisterService<
    Driver,
    ICallback<any>
> {
    sendEmail(data: Driver, token: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private hashPassword: HashPassword;
    constructor() {
        super();
        this.hashPassword = new HashPassword();
    }
    async register(data: Driver, callback: ICallback<any>): Promise<void> {
        let { email } = data;
        try {
            data.password = this.hashPassword.hashPassword(data.password);
            if (await this.checkEmail(email)) {
                let driver = new DriverSchema(data);
                await driver.save();
                Log.Info(
                    new Date(),
                    "Success",
                    `Register driver with email: ${email} - password: ${data.password}`,
                    "RegisterDriver"
                );

                callback(null, "Register success");
            } else {
                callback("Email already exists", null);
            }
        } catch (error) {
            Log.Error(new Date(), error, "RegisterDriver");
            callback(error, null);
        }
    }
    checkEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                DriverSchema.findOne({ email: email })
                    .then((data) => {
                        if (data) {
                            resolve(false);
                        } else {
                            CustomerSchema.findOne({ email: email }).then(
                                (data) => {
                                    if (data) {
                                        resolve(false);
                                    } else {
                                        EmployeeSchema.findOne({
                                            email: email,
                                        }).then((data) => {
                                            if (data) {
                                                resolve(false);
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    }
                                }
                            );
                        }
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
