import { Request, Response } from "express";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import {
    AddWalletService,
    GetWalletService,
} from "../../Services/Shipper/Wallet";
export function AddWalletController(
    req: Request,
    res: Response
): Response | void {
    const { amount, keyImg } = req.body;
    if (!amount || !keyImg) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Amount and URL image is required",
                    null,
                    new Date()
                )
            );
    }
    if (amount < 0 || amount < 100000) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Amount is invalid",
                    null,
                    new Date()
                )
            );
    }
    const { id } = req.user as any;
    AddWalletService(
        {
            Amount: amount,
            idDriver: id,
            url: keyImg,
        },
        (error, data) => {
            if (error) {
                return res
                    .status(HttpCode.INTERNAL_ERROR)
                    .json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            "Internal Server Error",
                            null,
                            new Date()
                        )
                    );
            }
            return res
                .status(HttpCode.OK)
                .json(
                    FormatApi(
                        HttpCode.OK,
                        "success",
                        "Add wallet successfully",
                        null,
                        new Date()
                    )
                );
        }
    );
}

export function GetWalletController(
    req: Request,
    res: Response
): Response | void {
    const { id } = req.user as any;
    GetWalletService(id, (error, data) => {
        if (error) {
            return res
                .status(HttpCode.INTERNAL_ERROR)
                .json(
                    FormatApi(
                        HttpCode.INTERNAL_ERROR,
                        "error",
                        "Internal Server Error",
                        null,
                        new Date()
                    )
                );
        }
        return res
            .status(HttpCode.OK)
            .json(
                FormatApi(
                    HttpCode.OK,
                    "success",
                    "Get wallet successfully",
                    data,
                    new Date()
                )
            );
    });
}
