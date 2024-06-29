import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { SignUp } from "../../Services/Shipper/auth";
import { HashPassword } from "../../Services/Hash";

export class SignUpShipperController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Response | void {
        const { Email, Name, Password, Phone, idTransport } = req.body;
        if (!Name || !Password || !Phone || !idTransport) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Missing fields",
                        null,
                        new Date()
                    )
                );
        }
        SignUp(
            {
                Email,
                Name,
                Phone,
                Password: new HashPassword().hashPassword(Password),
                idTransport,
            },
            (err, data) => {
                if (err) {
                    return res
                        .status(HttpCode.INTERNAL_ERROR)
                        .json(
                            FormatApi(
                                HttpCode.INTERNAL_ERROR,
                                "failed",
                                err,
                                null,
                                new Date()
                            )
                        );
                }
                if (!data?.err) {
                    return res
                        .status(HttpCode.OK)
                        .json(
                            FormatApi(
                                HttpCode.OK,
                                "success",
                                "Sign up success",
                                data,
                                new Date()
                            )
                        );
                }
            }
        );
    }
}
