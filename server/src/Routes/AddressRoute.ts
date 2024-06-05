import { AddressController } from "../Controllers/Address/AddressController";

import { BaseRoute } from "./BaseRoute";

export class AddressRoute extends BaseRoute {
    constructor() {
        super();
    }
    initRoutes(): void {
        this.router.get("/", (req, res) => {
            new AddressController().Controller(req, res);
        });
    }
}
