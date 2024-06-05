import { CreateInfoShipperController } from "../Controllers/Admin/CURDShipperController/CreateInfoShipperController";
import { SaveIdentityController } from "../Controllers/Admin/CURDShipperController/IdentityShipperController";
import { ListShipperController } from "../Controllers/Admin/CURDShipperController/ListShipperController";
import { BaseRoute } from "./BaseRoute";

export class AdminRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/info-shipper", (req, res) => {
            new CreateInfoShipperController().Controller(req, res);
        });
        this.router.get("/shipper", new ListShipperController().Controller);
        this.router.post("/shipper/identity", SaveIdentityController);
    }
}
