import { CreateInfoShipperController } from "../Controllers/Admin/CURDShipperController/CreateInfoShipperController";
import { SaveIdentityController } from "../Controllers/Admin/CURDShipperController/IdentityShipperController";
import { ListShipperController } from "../Controllers/Admin/CURDShipperController/ListShipperController";
import { ListShipperWaitingVerifyController } from "../Controllers/Admin/ListShipperWaitingVerifyController";
import {
    HandleSubmitWalletController,
    ListHistoryWalletController,
    ListSubmitWalletController,
} from "../Controllers/Admin/ShipperWalletController";
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
        this.router.get(
            "/shipper/identity",
            new ListShipperWaitingVerifyController().Controller
        );
        this.router.get(
            "/shipper/verify",
            new ListShipperWaitingVerifyController().Controller
        );
        this.router.put(
            "/shipper/verify",
            new ListShipperWaitingVerifyController().VerifyShipper
        );
        this.router.get(
            "/shipper/verify/:id",
            new ListShipperWaitingVerifyController().DetailShipper
        );

        this.router.get("/shipper/wallet", ListSubmitWalletController);
        this.router.put("/shipper/wallet", HandleSubmitWalletController);
        this.router.get("/shipper/wallet/history", ListHistoryWalletController);
    }
}
