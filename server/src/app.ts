import cors, { CorsOptions } from "cors";
import { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Route } from "./Routes";

export class App {
    private app: Express;
    private corsOptions: CorsOptions = {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        // allowedHeaders: "*",
    };

    private route: Route;
    constructor(express: Express) {
        this.app = express;
        this.route = new Route();
    }

    public initApp(): void {
        this.app.use(cors(this.corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan("combined"));
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.app.use("/api", this.route.getRouter());
    }
    public getApp(): Express {
        return this.app;
    }
}
