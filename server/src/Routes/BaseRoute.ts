import { Router } from "express";
export abstract class BaseRoute {
    protected router: Router;
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    abstract initRoutes(): void;

    public getRouter() {
        return this.router;
    }
}
