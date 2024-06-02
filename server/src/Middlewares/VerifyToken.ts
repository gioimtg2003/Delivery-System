import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../Lib/Constants/HttpCode";
import { FormatApi } from "../Lib/Utils/FormatApi";
import jwt from "jsonwebtoken";

interface ITokenData {
    err: boolean;
    msg?: string;
    id?: string;
    role?: string;
    email?: string;
}

export class VerifyToken {
    public static async middleware(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ) {
        let token =
            req.body.token ||
            req.query.token ||
            String(req.headers["authorization"]).split("Bearer ")[1];
        if (!token) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Missing the token",
                        null,
                        new Date()
                    )
                );
        }
        try {
            let check = await VerifyToken.handleToken(token);
            if (check.err) {
                return res
                    .status(HttpCode.UNAUTHORIZED)
                    .json(
                        FormatApi(
                            HttpCode.UNAUTHORIZED,
                            "failed",
                            check.msg,
                            null,
                            new Date()
                        )
                    );
            } else if (!check.err) {
                req.user = {
                    id: String(check.id),
                    role: String(check.role),
                    email: String(check.email),
                };
                next();
            }
        } catch (err) {
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
        }
    }

    public static handleToken(token: string): Promise<ITokenData> {
        return new Promise((resolve, reject) => {
            try {
                let data: ITokenData = {} as ITokenData;
                jwt.verify(
                    token,
                    process.env.SECRET_KEY as string,
                    (err, decoded: any) => {
                        if (err) {
                            data.err = true;
                            data.msg = err.message;
                        } else {
                            data.err = false;
                            data.id = decoded.id;
                            data.role = decoded.role;
                            data.email = decoded.email;
                        }
                        resolve(data);
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }
}
