import { Request, Response } from "express";
import {
    HandleSubmitWallet,
    ListHistoryShipperWallet,
    ListShipperWallet,
} from "../../Services/Admin/ShipperWallet";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

const ListSubmitWalletController = (req: Request, res: Response) => {
    ListShipperWallet((err, data) => {
        if (err) {
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
        return res
            .status(HttpCode.OK)
            .json(FormatApi(HttpCode.OK, "success", null, data, new Date()));
    });
};

const ListHistoryWalletController = (req: Request, res: Response) => {
    ListHistoryShipperWallet((err, data) => {
        if (err) {
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
        return res
            .status(HttpCode.OK)
            .json(FormatApi(HttpCode.OK, "success", null, data, new Date()));
    });
};

const HandleSubmitWalletController = (req: Request, res: Response) => {
    const { id: idWallet, status } = req.body;
    const { id } = req.user as any;
    if (!idWallet || !status) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "id and status is required",
                    null,
                    new Date()
                )
            );
    }
    if (status !== "accept" && status !== "reject") {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "status must be accept or reject",
                    null,
                    new Date()
                )
            );
    }
    HandleSubmitWallet(
        { id: idWallet, status, idEmployee: id },
        (err, data) => {
            if (err) {
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
            return res
                .status(HttpCode.OK)
                .json(
                    FormatApi(
                        HttpCode.OK,
                        "success",
                        "Update successfully",
                        data,
                        new Date()
                    )
                );
        }
    );
};

export {
    ListSubmitWalletController,
    HandleSubmitWalletController,
    ListHistoryWalletController,
};
