import { ListTransportController } from "../Controllers/Admin/TransportController";
import { RefreshTokenController } from "../Controllers/RefreshTokenController";
import { VerifyToken } from "../Middlewares/VerifyToken";
import { AddressRoute } from "./AddressRoute";
import { AdminRoute } from "./AdminRoute";
import { AuthAdmin } from "./AuthAdmin";
import { BaseRoute } from "./BaseRoute";
import { MediaRoute } from "./MediaRoute";
import { ShipperAuthRoute } from "./ShipperAuthRoute";

export class Route extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.router.use("/admin/auth", new AuthAdmin().getRouter());
        this.router.use("/shipper/auth", new ShipperAuthRoute().getRouter());
        this.router.use(
            "/admin",
            VerifyToken.middleware,
            new AdminRoute().getRouter()
        );
        this.router.use(
            "/media",
            VerifyToken.middleware,
            new MediaRoute().getRouter()
        );

        this.router.get("/transport-type", ListTransportController);
        this.router.use("/address", new AddressRoute().getRouter());
        this.router.post("/auth/token", (req, res) => {
            new RefreshTokenController().Controller(req, res);
        });
        // this.router.use(
        //     "/customer",
        //     VerifyToken.middleware,
        //     new CustomerRoute().getRouter()
        // );
        // this.router.use(
        //     "/order",
        //     VerifyToken.middleware,
        //     new OrderRoute().getRouter()
        // );
    }
}
