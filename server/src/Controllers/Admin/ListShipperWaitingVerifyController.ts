import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { ListShipperWaitingVerifyService } from "../../Services/Admin/Shipper/ListShipperWaitingVerifyService";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export class ListShipperWaitingVerifyController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void {
        ListShipperWaitingVerifyService((error, data) => {
            if (error) {
                return res
                    .status(HttpCode.INTERNAL_ERROR)
                    .json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            error,
                            null,
                            new Date()
                        )
                    );
            } else {
                return res
                    .status(HttpCode.OK)
                    .json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "get list shipper waiting verify success",
                            data,
                            new Date()
                        )
                    );
            }
        });
    }
}
