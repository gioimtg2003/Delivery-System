import {
    GetDriverByIdController,
    UpdateStatusController,
} from "../Controllers/Shipper/CURDController";
import {
    DeliverySuccessOrderController,
    GetOrderDetailsPickupController,
    GetOrderPendingController,
    GetOrderPendingDetailsController,
    PickedUpOrderController,
    PickupOrderController,
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
        this.router.get("/order/", GetOrderPendingController);
        this.router.get("/order/pending/:id", GetOrderPendingDetailsController);
        this.router.post("/order/pickup/:id", PickupOrderController);
        this.router.get("/order/pickup", GetOrderDetailsPickupController);
        this.router.put("/order/pickup/delivery", PickedUpOrderController);
        this.router.post("/order/success", DeliverySuccessOrderController);
    }
}
