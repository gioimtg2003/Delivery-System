import { Request, Response } from "express";
import {
    DeliverySuccessOrderService,
    GetOrderDetailsPickupService,
    GetOrderPendingDetailsService,
    GetOrdersService,
    PickupOrderService,
    UpdatePickupOrderService,
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
    if (!idOrder)
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "id is required",
                    null,
                    new Date()
                )
            );
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

export const PickupOrderController = (req: Request, res: Response) => {
    const { id: idOrder } = req.params;
    const { id } = req.user as any;
    PickupOrderService({ id: String(idOrder), idUser: id }, (err, data) => {
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

        if (data?.error) {
            return res
                .status(HttpCode.REQUEST_REJECT)
                .json(
                    FormatApi(
                        HttpCode.REQUEST_REJECT,
                        "success",
                        "Failed to pickup order",
                        data.data,
                        new Date()
                    )
                );
        }

        return res
            .status(HttpCode.OK)
            .json(
                FormatApi(HttpCode.OK, "success", data?.data, null, new Date())
            );
    });
};

export const GetOrderDetailsPickupController = (
    req: Request,
    res: Response
) => {
    const { id } = req.user as any;
    GetOrderDetailsPickupService({ id: id }, (err, data) => {
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

export const PickedUpOrderController = (
    req: Request,
    res: Response
): void | Response => {
    const { id } = req.user as any;
    UpdatePickupOrderService(id, (err, data) => {
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

export const DeliverySuccessOrderController = (req: Request, res: Response) => {
    const { id } = req.user as any;
    DeliverySuccessOrderService(id, (err, data) => {
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
