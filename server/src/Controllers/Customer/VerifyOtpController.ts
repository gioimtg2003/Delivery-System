import { Request, Response } from "express";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import VerifyService from "../../Services/Customer/Verify.service";

function VerifyOTP(req: Request, res: Response): void | Response {
    const { otp, Phone } = req.body;
    if (!otp || !Phone) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Otp, Phone is required",
                    null,
                    new Date()
                )
            );
    }
    VerifyService.VerifyOTP({ otp, Phone }, (err, data) => {
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
        } else if (data?.err) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        data.message,
                        null,
                        new Date()
                    )
                );
        } else {
            return res
                .status(HttpCode.OK)
                .json(
                    FormatApi(
                        HttpCode.OK,
                        "success",
                        data?.message,
                        null,
                        new Date()
                    )
                );
        }
    });
}

function ResendOtp(req: Request, res: Response): void | Response {
    const { Phone } = req.body;

    if (!Phone) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Phone is required",
                    null,
                    new Date()
                )
            );
    }

    VerifyService.ResendOtp(Phone, (err, data) => {
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
                        "Resend OTP success",
                        null,
                        new Date()
                    )
                );
        }
    });
}

export = { VerifyOTP, ResendOtp };
