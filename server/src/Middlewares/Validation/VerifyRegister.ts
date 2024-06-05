import { Request, Response, NextFunction } from "express";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { HttpCode } from "../../Lib/Constants/HttpCode";

export class VerifyRegister {
    public static async verifyRegister(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let { user, token, id } = req.body;
        console.log(user, token, id);
        if (!user || !token || !id) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "error",
                        "Missing required fields",
                        null,
                        new Date()
                    )
                );
        }
        next();
    }
}
