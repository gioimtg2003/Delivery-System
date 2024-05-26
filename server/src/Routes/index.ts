import { AuthAdmin } from "./AuthAdmin";
import { BaseRoute } from "./BaseRoute";

export class Route extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.router.use("/admin", new AuthAdmin().getRouter());
        // this.router.use("/verify", new VerifyRoute().getRouter());

        // this.router.use("/address", new AddressRoute().getRouter());
        // this.router.post("/token", (req, res) => {
        //     new RefreshTokenController().Controller(req, res);
        // });
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
