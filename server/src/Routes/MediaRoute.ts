import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { GetUrlS3Controller } from "../Controllers/Media/GetUrlS3Controller";
import { SignUrlS3Controller } from "../Controllers/Media/SignUrlS3Controller";
import { VerifyToken } from "../Middlewares/VerifyToken";
import { BaseRoute } from "./BaseRoute";
const limiterMedia: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 1000,
    max: 1,
    message: {
        code: 429,
        status: "failed",
        message: "Yêu cầu quá nhanh, vui lòng thử lại sau 15 giây",
    },
    validate: { trustProxy: false },
});
export class MediaRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.post("/sign-url", limiterMedia, (req, res) => {
            new SignUrlS3Controller().Controller(req, res);
        });
        this.router.get(
            "/sign-url",
            VerifyToken.middleware,
            new GetUrlS3Controller().Controller
        );
    }
}
