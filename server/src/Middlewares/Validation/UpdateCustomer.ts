import { NextFunction, Request, Response } from "express";
import { BaseValidate } from "./BaseValidate";

export class UpdateCustomer extends BaseValidate {
    constructor() {
        super();
    }
    public static validateUpdateCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const fields = [
            "name",
            "shop_name",
            "phone",
            "address",
            "province",
            "province_id",
            "district",
            "district_id",
            "ward",
            "ward_id",
            "address_detail",
            "lat",
            "lng",
            "street_id",
            "street",
        ];
        const valid = Object.keys(req.body).every((key) =>
            fields.includes(key)
        );
        console.log(req.body);
        if (!valid) {
            return res.status(400).json({
                code: 400,
                message: "Invalid fields",
            });
        }
        const { email, phone } = req.body;
        if (email) {
            console.log(email);
            if (!BaseValidate.validateEmail(email)) {
                return res.status(400).json({
                    code: 400,
                    message: "Email is invalid",
                });
            }
        }
        if (phone) {
            if (!BaseValidate.validatePhone(phone)) {
                return res.status(400).json({
                    code: 400,
                    message: "Phone is invalid",
                });
            }
        }
        next();
    }
}
