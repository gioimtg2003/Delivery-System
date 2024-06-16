import { LoginCustomerController } from "../Controllers/Customer/LoginCustomerController";
import { RegisterCustomerController } from "../Controllers/Customer/RegisterCustomerController";
import VerifyOtpController from "../Controllers/Customer/VerifyOtpController";
import { BaseRoute } from "./BaseRoute";

export class CustomerAuthRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-in", new LoginCustomerController().Controller);
        this.router.post(
            "/sign-up",
            new RegisterCustomerController().Controller
        );
        this.router.post("/resend-otp", VerifyOtpController.ResendOtp);
        this.router.post("/verify-otp", VerifyOtpController.VerifyOTP);
    }
}
