import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "./BaseController";
import { HttpCode } from "../Lib/Constants/HttpCode";
import { FormatApi } from "../Lib/Utils/FormatApi";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JsonWebToken } from "../Services/JsonWebToken";
import { IDataLogin } from "../Lib/Types/IdataLogin";
import { Expired } from "../Lib/Constants/Expired";

export class RefreshTokenController extends BaseController {
    Controller(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): void {
        let refresh_token =
            req.body.token ||
            req.query.token ||
            String(req.headers["authorization"]).split("Bearer ")[1];
        if (!refresh_token) {
            res.status(HttpCode.BAD_REQUEST).json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Missing the token",
                    null,
                    new Date()
                )
            );
        }
        jwt.verify(
            refresh_token,
            process.env.SECRET_KEY as string,
            async (err: VerifyErrors | null, decode: any) => {
                if (err) {
                    res.status(HttpCode.UNAUTHORIZED).json(
                        FormatApi(
                            HttpCode.UNAUTHORIZED,
                            "failed",
                            err.message,
                            null,
                            new Date()
                        )
                    );
                } else if (decode.refresh_token) {
                    let token = new JsonWebToken();
                    token.setPayload(decode);
                    let access_token = await token.signAccessToken();
                    token.setPayload(decode, true);
                    let new_refresh_token = await token.signRefreshToken();
                    let data: IDataLogin = {
                        access_token: access_token as any,
                        refresh_token: new_refresh_token as any,
                        exp: Math.floor(
                            Date.now() + Expired.ACCESS_TOKEN * 1000 - 10000
                        ),
                    };
                    res.status(HttpCode.OK).json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "Refresh token success",
                            data,
                            new Date()
                        )
                    );
                } else {
                    res.status(HttpCode.UNAUTHORIZED).json(
                        FormatApi(
                            HttpCode.UNAUTHORIZED,
                            "failed",
                            "Invalid token",
                            null,
                            new Date()
                        )
                    );
                }
            }
        );
    }
}
