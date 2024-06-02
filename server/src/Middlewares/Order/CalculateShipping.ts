import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { BaseValidate } from "../Validation/BaseValidate";

export class ValidateCalculateShipping extends BaseValidate {
    public static ValidateCalculateShippingMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const fields = [
            "pick_street_id",
            "pick_ward_id",
            "pick_district_id",
            "pick_province_id",
            "pick_street_name",
            "pick_province_name",
            "pick_district_name",
            "pick_ward_name",
            "weight",
        ];
        const missingFields = BaseValidate.validateFields(req, fields);
        if (missingFields.length > 0) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        `Missing required fields: ${missingFields.join(", ")}`,
                        null,
                        new Date()
                    )
                );
        }
        next();
    }
}
