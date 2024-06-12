import { GetDriverByIdController } from "../Controllers/Shipper/CURDController";
import { BaseRoute } from "./BaseRoute";

export class ShipperRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/", GetDriverByIdController);
    }
}
