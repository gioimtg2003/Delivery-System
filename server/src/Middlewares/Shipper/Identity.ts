import { NextFunction, Request, Response } from "express";
import { BaseValidate } from "../Validation/BaseValidate";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export class IdentityShipper extends BaseValidate {
    public static middleware(req: Request, res: Response, next: NextFunction) {
        const requiredFields = [
            "idShipper",
            "ImgDriveLicenseBefore",
            "ImgDriveLicenseAfter",
            "ImgIdentityCardBefore",
            "ImgIdentityCardAfter",
            "ImgVehicleRegistrationCertBefore",
            "ImgVehicleRegistrationCertAfter",
        ];

        const missingFields = BaseValidate.validateFields(req, requiredFields);

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
