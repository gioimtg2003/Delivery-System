import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { Address } from "../../Services/Address/Address";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export class DistrictController extends BaseController {
    private districtService: Address;
    constructor() {
        super();
        this.districtService = new Address();
    }
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void {
        this.districtService.getDistricts((error, data) => {
            if (error) {
                res.status(HttpCode.INTERNAL_ERROR).json(
                    FormatApi(
                        HttpCode.INTERNAL_ERROR,
                        "error",
                        error,
                        null,
                        new Date()
                    )
                );
            } else {
                res.status(HttpCode.OK).json(
                    FormatApi(
                        HttpCode.OK,
                        "success",
                        "get districts success",
                        data,
                        new Date()
                    )
                );
            }
        });
    }
}
