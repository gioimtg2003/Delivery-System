import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { Address as AddressService } from "../../Services/Address/Address";

export class AddressController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void {
        let { pid } = req.query as any;
        pid = (pid as number) || null;
        let address = new AddressService();
        address.getAddress(pid, (error, data) => {
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
                        "get address success",
                        data,
                        new Date()
                    )
                );
            }
        });
    }
}
