import {
    GetDriverByIdController,
    UpdateStatusController,
} from "../Controllers/Shipper/CURDController";
import {
    GetOrderPendingController,
    GetOrderPendingDetailsController,
} from "../Controllers/Shipper/OrderController";
import {
    AddWalletController,
    GetWalletController,
} from "../Controllers/Shipper/WalletController";
import { BaseRoute } from "./BaseRoute";

export class ShipperRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/", GetDriverByIdController);
        this.router.put("/status", UpdateStatusController);
        this.router.post("/wallet", AddWalletController);
        this.router.get("/wallet", GetWalletController);
        this.router.get("/order", GetOrderPendingController);
        this.router.get("/order/:id", GetOrderPendingDetailsController);
    }
}
