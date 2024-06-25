import { CreateOrderController } from "../Controllers/Customer/OrderController";

import { BaseRoute } from "./BaseRoute";

export class CustomerRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/order", CreateOrderController);
    }
}
