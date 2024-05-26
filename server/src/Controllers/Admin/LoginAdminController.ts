import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { LoginAdmin } from "../../Services/Auth/LoginAdmin";

export class LoginAdminController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Response<any, Record<string, any>> | void {
        try {
            const { Email, Password } = req.body;
            if (!Email || !Password) {
                return res
                    .status(HttpCode.BAD_REQUEST)
                    .json(
                        FormatApi(
                            HttpCode.BAD_REQUEST,
                            "failed",
                            "Email or Password is required!",
                            null,
                            new Date()
                        )
                    );
            }
            let LoginService = new LoginAdmin();
            LoginService.login(req.body, (err, result) => {
                if (err) {
                    return res
                        .status(HttpCode.INTERNAL_ERROR)
                        .json(
                            FormatApi(
                                HttpCode.INTERNAL_ERROR,
                                "error",
                                "Internal Server Error",
                                null,
                                new Date()
                            )
                        );
                }
                if (result?.error) {
                    return res
                        .status(HttpCode.UNAUTHORIZED)
                        .json(
                            FormatApi(
                                HttpCode.UNAUTHORIZED,
                                "failed",
                                result.message,
                                null,
                                new Date()
                            )
                        );
                }
                return res
                    .status(HttpCode.OK)
                    .json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "Login success",
                            result?.data,
                            new Date()
                        )
                    );
            });
        } catch (error) {
            return res
                .status(HttpCode.INTERNAL_ERROR)
                .json(
                    FormatApi(
                        HttpCode.INTERNAL_ERROR,
                        "error",
                        "Internal Server Error",
                        null,
                        new Date()
                    )
                );
        }
    }
}
