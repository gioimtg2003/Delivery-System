import dotenv from "dotenv";
dotenv.config();
import { MongoService } from "./src/Database/connect";
import { MONGO_URI, DATABASE_NAME } from "./src/Configs/db";
import { App } from "./src/app";
import express from "express";
import { createServer, Server as IServer } from "http";
import { initSocket } from "./src/socket";
class Server {
    private mongo: MongoService;
    private port: string | number;
    private app: App;
    private server: IServer;

    constructor() {
        console.log(`running on ${process.env.NODE_ENV} mode`);
        this.port = process.env.PORT ?? process.exit(1);
        this.mongo = new MongoService(MONGO_URI, DATABASE_NAME);
        this.app = new App(express());
        this.app.initApp();
        this.server = createServer(this.app.getApp());
        initSocket(this.server);
    }

    async start() {
        process.nextTick(() => {
            this.mongo.connection();
        });
        this.server.listen(this.port, () => {
            console.log("Server started");
            console.log(`Server running on port ${this.port}`);
            console.log(`worker process id: ${process.pid}`);
            process.on("disconnect", () => {
                console.log("Server closed");
                this.server.close();
                process.exit(0);
            });

            //process.emit("disconnect");
        });
    }
}

const server = new Server();
server.start();
