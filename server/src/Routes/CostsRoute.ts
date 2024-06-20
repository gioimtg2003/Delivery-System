import { TransportCostController } from "../Controllers/Customer/TransportController";
import { BaseRoute } from "./BaseRoute";

export class CostsRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/calculate", TransportCostController);
    }
}
