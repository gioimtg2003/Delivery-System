import { LoginAdminController } from "../Controllers/Admin/LoginAdminController";
import { BaseRoute } from "./BaseRoute";

export class AuthAdmin extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/auth/sign-in", (req, res) => {
            new LoginAdminController().Controller(req, res);
        });
    }
}
