import { LoginShipperController } from "../Controllers/Shipper/LoginShipperController";
import { BaseRoute } from "./BaseRoute";

export class ShipperRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-in", new LoginShipperController().Controller);
    }
}
