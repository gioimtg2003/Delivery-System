import { Request, Response } from "express";
import {
    GetOrderPendingDetailsService,
    GetOrdersService,
} from "../../Services/Shipper/Order";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export const GetOrderPendingController = (req: Request, res: Response) => {
    const { id } = req.user as any;
    GetOrdersService(id, (err, data) => {
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

export const GetOrderPendingDetailsController = (
    req: Request,
    res: Response
) => {
    const { id: idOrder } = req.params;
    const { id } = req.user as any;
    GetOrderPendingDetailsService(
        { id: String(idOrder), idUser: id },
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
                    FormatApi(HttpCode.OK, "success", null, data, new Date())
                );
        }
    );
};
