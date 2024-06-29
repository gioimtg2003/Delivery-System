import { GetCustomerByIdController } from "../Controllers/Customer/CURDController";
import {
    CreateOrderController,
    GetOrderDetailController,
    HistoryOrderController,
    UpdateStatusOrderController,
} from "../Controllers/Customer/OrderController";

import { BaseRoute } from "./BaseRoute";

export class CustomerRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/order/:id", GetOrderDetailController);
        this.router.post("/order/:id", UpdateStatusOrderController);
        this.router.post("/order", CreateOrderController);
        this.router.get("/", GetCustomerByIdController);
        this.router.get("/order-history", HistoryOrderController);
    }
}
