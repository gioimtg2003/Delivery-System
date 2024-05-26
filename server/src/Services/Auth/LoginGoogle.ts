import { ICallback } from "../../Lib/Types/Callback";
import { Customer } from "../../Lib/Types/Customer";
import { BaseLogin } from "./BaseLogin";
import { Log } from "../../Lib/Utils/Log";
import CustomerSchema from "../../Models/Customer";
import { JsonWebToken } from "../JsonWebToken";
import { WelcomeCustomerLogin } from "../Email/WelcomeCustomerLogin";

export class LoginGoogle extends BaseLogin {
    constructor() {
        super();
        this._jwtService = new JsonWebToken();
    }
    async login(data: Customer, callback: ICallback<any>): Promise<void> {
        try {
            let customer = await CustomerSchema.findOne({ email: data.email });
            if (customer) {
                let token = await this.handleToken(customer);
                Log.Info(
                    new Date(),
                    "Success",
                    `Login success id:: ${customer._id}`,
                    "LoginGoogle"
                );
                return callback(null, token);
            } else {
                let newCustomer = new CustomerSchema(data);
                newCustomer.save();
                let token = await this.handleToken(newCustomer);
                Log.Info(
                    new Date(),
                    "Success",
                    `Login success id:: ${newCustomer._id}`,
                    "LoginGoogle"
                );
                let email = new WelcomeCustomerLogin(
                    newCustomer.email,
                    newCustomer.name
                );
                email.sendEmail();
                return callback(null, token);
            }
        } catch (error) {
            Log.Error(new Date(), error, "LoginGoogle");
            callback(error, null);
        }
        throw new Error("Method not implemented.");
    }
}
