import { NextFunction, Request, Response } from "express";
import { BaseValidate } from "./BaseValidate";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export class LoginCustomer extends BaseValidate {
    constructor() {
        super();
    }
    public static validateLoginCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let requiredFields = ["email", "password"];
        let missingFields = BaseValidate.validateFields(req, requiredFields);
        if (missingFields.length > 0) {
            res.status(HttpCode.BAD_REQUEST).json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    `Missing required fields: ${missingFields.join(", ")}`,
                    {},
                    new Date()
                )
            );
        } else {
            next();
        }
    }
}
