import { IdentityController } from "../Controllers/Shipper/IdentityController";
import { LoginShipperController } from "../Controllers/Shipper/LoginShipperController";
import { SignUpShipperController } from "../Controllers/Shipper/SignUpShipperController";
import { IdentityShipper } from "../Middlewares/Shipper/Identity";
import { BaseRoute } from "./BaseRoute";

export class ShipperAuthRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-in", new LoginShipperController().Controller);
        this.router.post("/sign-up", new SignUpShipperController().Controller);
        this.router.post(
            "/identity",
            IdentityShipper.middleware,
            IdentityController
        );
    }
}
