import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseCURDShipperController } from "./BaseCURDShipper";
import { HttpCode } from "../../../Lib/Constants/HttpCode";
import { FormatApi } from "../../../Lib/Utils/FormatApi";

export class CreateInfoShipperController extends BaseCURDShipperController {
    constructor() {
        super();
    }
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void {
        const {
            Name,
            Province,
            District,
            Ward,
            DetailsAddress,
            Phone,
            Email,
            Password,
            Hamlet,
        } = req.body;

        this.service.createInfoShipper(
            {
                Name: String(Name),
                Province: String(Province),
                District: String(District),
                Ward: String(Ward),
                DetailsAddress: String(DetailsAddress),
                Phone: String(Phone),
                Email: String(Email),
                Password: String(Password),
                Hamlet: String(Hamlet),
                idTransport: 5,
            },
            (err, data) => {
                if (err) {
                    res.status(HttpCode.INTERNAL_ERROR).json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            err,
                            null,
                            new Date()
                        )
                    );
                } else {
                    res.status(HttpCode.CREATED).json(
                        FormatApi(
                            HttpCode.CREATED,
                            "success",
                            "Create Information Shipper",
                            data,
                            new Date()
                        )
                    );
                }
            }
        );
    }
}
