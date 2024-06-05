import { Request, Response, NextFunction } from "express";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { Phone } from "../../Lib/Entities/Phone";
import { Email } from "../../Lib/Entities/Email";

export class BaseValidate {
    constructor() {}
    protected static validateFields(req: Request, fields: string[]): string[] {
        return fields.filter((field) => !req.body[field]);
    }

    protected static validateEmail(email: string): boolean {
        return new Email(email).isValidate();
    }

    protected static validatePhone(phone: string): boolean {
        return new Phone(phone).isValidate();
    }

    protected static equalPassword(
        password: string,
        re_password: string
    ): boolean {
        return password === re_password;
    }

    private static validatePassword(password: string): boolean {
        return password.length >= 6;
    }

    private static validateRegisterFields(
        email: string,
        phone: string,
        password: string
    ): boolean {
        return (
            !BaseValidate.validateEmail(email) ||
            !BaseValidate.validatePhone(phone) ||
            !BaseValidate.validatePassword(password)
        );
    }

    public static validateRegisterCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let requiredFields = [
            "name",
            "shop_name",
            "email",
            "phone",
            "password",
            "re_password",
        ];

        let missingFields = BaseValidate.validateFields(req, requiredFields);
        if (missingFields.length > 0) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                `Missing required fields: ${missingFields.join(", ")}`,
                {},
                new Date()
            );
            return res.status(HttpCode.BAD_REQUEST).json(API);
        }

        if (
            BaseValidate.validateRegisterFields(
                req.body.email,
                req.body.phone,
                req.body.password
            )
        ) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                "Phone or Email is invalid",
                null,
                new Date()
            );
            return res.status(400).json(API);
        }
        if (
            !BaseValidate.equalPassword(req.body.password, req.body.re_password)
        ) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                "Password and Re-Password not match",
                null,
                new Date()
            );
            return res.status(HttpCode.BAD_REQUEST).json(API);
        }
        next();
    }
    public static validateRegisterDriver(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let requiredFields = [
            "name",
            "email",
            "phone",
            "password",
            "re_password",
            "province",
            "district",
            "ward",
            "address_detail",
            "province_id",
            "district_id",
            "ward_id",
        ];

        let missingFields = BaseValidate.validateFields(req, requiredFields);
        if (missingFields.length > 0) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                `Missing required fields: ${missingFields.join(", ")}`,
                {},
                new Date()
            );
            return res.status(400).json(API);
        }

        if (
            BaseValidate.validateRegisterFields(
                req.body.email,
                req.body.phone,
                req.body.password
            )
        ) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                "Phone or Email is invalid",
                null,
                new Date()
            );
            return res.status(400).json(API);
        }
        if (
            !BaseValidate.equalPassword(req.body.password, req.body.re_password)
        ) {
            let API = FormatApi(
                HttpCode.BAD_REQUEST,
                "error",
                "Password and Re-Password not match",
                null,
                new Date()
            );
            return res.status(400).json(API);
        }
        next();
    }
}
