import cors, { CorsOptions } from "cors";
import { Express, static as static_ } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Route } from "./Routes";
import pool from "./Database/mysql";
import { RowDataPacket } from "mysql2";

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

    public async initApp(): Promise<void> {
        try {
            let conn = await pool.getConnection();
            if (conn) {
                console.log("Connected to database");
                await conn.execute("set time_zone='+07:00'");
                conn.release();
            }
        } catch (error) {
            console.error("Error connecting to database", error);
            process.exit(1);
        }
        this.app.use(cors(this.corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan("combined"));
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.app.use("/api", static_("public"), this.route.getRouter());
    }
    public getApp(): Express {
        return this.app;
    }
}
