import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { ListTransportController } from "../Controllers/Admin/TransportController";
import { TransportCostController } from "../Controllers/Customer/TransportController";
import { RefreshTokenController } from "../Controllers/RefreshTokenController";
import { VerifyToken } from "../Middlewares/VerifyToken";
import { AddressRoute } from "./AddressRoute";
import { AdminRoute } from "./AdminRoute";
import { AuthAdmin } from "./AuthAdmin";
import { BaseRoute } from "./BaseRoute";
import { CostsRoute } from "./CostsRoute";
import { CustomerAuthRoute } from "./CustomerAuthRoute";
import { CustomerRoute } from "./CustomerRoute";
import { MediaRoute } from "./MediaRoute";
import { ShipperAuthRoute } from "./ShipperAuthRoute";
import { ShipperRoute } from "./ShipperRoute";

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
        this.router.use("/customer/auth", new CustomerAuthRoute().getRouter());
        this.router.use(
            "/customer",
            VerifyToken.middleware,
            new CustomerRoute().getRouter()
        );
        this.router.use(
            "/costs",
            VerifyToken.middleware,
            new CostsRoute().getRouter()
        );
        this.router.use(
            "/shipper",
            VerifyToken.middleware,
            new ShipperRoute().getRouter()
        );
        this.router.use(
            "/admin",
            VerifyToken.middleware,
            new AdminRoute().getRouter()
        );
        this.router.use("/media", new MediaRoute().getRouter());

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
