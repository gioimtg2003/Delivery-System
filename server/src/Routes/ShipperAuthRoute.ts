import { LoginShipperController } from "../Controllers/Shipper/LoginShipperController";
import { SignUpShipperController } from "../Controllers/Shipper/SignUpShipperController";
import { BaseRoute } from "./BaseRoute";

export class ShipperAuthRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-in", new LoginShipperController().Controller);
        this.router.post("/sign-up", new SignUpShipperController().Controller);
    }
}
