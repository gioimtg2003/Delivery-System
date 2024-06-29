import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { LoginShipper } from "../../Services/Auth/LoginShipper";
import { LoginCustomer } from "../../Services/Auth/LoginCustomer";

export class LoginCustomerController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Response | void {
        const { phone, password } = req.body;
        if (!phone || !password) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Phone or password is required",
                        null,
                        new Date()
                    )
                );
        }
        let loginCustomer = new LoginCustomer();
        loginCustomer.login({ phone, password }, (err, data) => {
            if (err) {
                return res
                    .status(HttpCode.INTERNAL_ERROR)
                    .json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            err,
                            null,
                            new Date()
                        )
                    );
            } else if (data?.error) {
                return res
                    .status(HttpCode.BAD_REQUEST)
                    .json(
                        FormatApi(
                            HttpCode.BAD_REQUEST,
                            "failed",
                            data.message,
                            null,
                            new Date()
                        )
                    );
            } else if (!data?.error) {
                return res
                    .status(HttpCode.OK)
                    .json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "Login success",
                            data,
                            new Date()
                        )
                    );
            }
        });
    }
}
