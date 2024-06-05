import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CURDShipper } from "../../../Services/Admin/Shipper/CURDShipper";
import { BaseController } from "../../BaseController";

export abstract class BaseCURDShipperController {
    protected service: CURDShipper;
    constructor() {
        this.service = new CURDShipper();
    }

    abstract Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void;
}
