import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { RegisterCustomer } from "../../Services/Auth/RegisterCustomer";

export class RegisterCustomerController extends BaseController {
    Controller(req: Request, res: Response): Response | void {
        const { Phone, Password, Email } = req.body;
        if (!Phone || !Password) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Phone or Password is required",
                        null,
                        new Date()
                    )
                );
        } else {
            let register = new RegisterCustomer();
            register.register({ Phone, Password, Email }, (err, data) => {
                if (err) {
                    return res
                        .status(HttpCode.INTERNAL_ERROR)
                        .json(
                            FormatApi(
                                HttpCode.INTERNAL_ERROR,
                                "failed",
                                err,
                                null,
                                new Date()
                            )
                        );
                } else if (data) {
                    return res
                        .status(HttpCode.OK)
                        .json(
                            FormatApi(
                                HttpCode.OK,
                                "success",
                                "Register success",
                                null,
                                new Date()
                            )
                        );
                }
            });
        }
    }
}
