import { SignUrlS3Controller } from "../Controllers/Media/SignUrlS3Controller";
import { BaseRoute } from "./BaseRoute";

export class MediaRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-url", (req, res) => {
            new SignUrlS3Controller().Controller(req, res);
        });
    }
}
