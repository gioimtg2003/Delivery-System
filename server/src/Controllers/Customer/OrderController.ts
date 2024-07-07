import { Request, Response } from "express";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import {
    CreateOrderService,
    GetOrderDetailService,
    HistoryOrderService,
    UpdateStatusOrderService,
} from "../../Services/Customer/Order.service";

export const CreateOrderController = (
    req: Request,
    res: Response
): Response | void => {
    const {
        senderName,
        senderPhone,
        senderAddress,
        senderDetailsAddress,
        receiverName,
        receiverPhone,
        receiverAddress,
        receiverDetailsAddress,
        isTakeShippingFee,
        idTransport,
        note,
        isCOD,
        COD,
    } = req.body;
    if (
        !senderName ||
        !senderPhone ||
        !senderAddress ||
        !receiverName ||
        !receiverPhone ||
        !receiverAddress ||
        !idTransport
    ) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Missing required fields",
                    null,
                    new Date()
                )
            );
    }
    const { id } = req.user as any;
    CreateOrderService(
        {
            idCustomer: id,
            SenderName: senderName,
            SenderPhone: senderPhone,
            SenderAddress: senderAddress,
            SenderDetailsAddress: senderDetailsAddress,
            ReceiverName: receiverName,
            ReceiverPhone: receiverPhone,
            ReceiverAddress: receiverAddress,
            ReceiverDetailsAddress: receiverDetailsAddress,
            isTakeShippingFee,
            idTransport,
            Note: note,
            isCOD,
            COD: COD || 0,
            ShippingFee: 0,
            CurrentStatus: "pending",
        },
        (err, data) => {
            if (err) {
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
            } else if (data?.err) {
                return res
                    .status(HttpCode.BAD_REQUEST)
                    .json(
                        FormatApi(
                            HttpCode.BAD_REQUEST,
                            "error",
                            data.msg,
                            null,
                            new Date()
                        )
                    );
            } else {
                return res
                    .status(HttpCode.CREATED)
                    .json(
                        FormatApi(
                            HttpCode.CREATED,
                            "success",
                            "Create Order Success",
                            data?.data,
                            new Date()
                        )
                    );
            }
        }
    );
};

export const HistoryOrderController = (
    req: Request,
    res: Response
): void | Response => {
    const { id } = req.user as any;
    HistoryOrderService(id, (err, data) => {
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
                    "Successfully",
                    data,
                    new Date()
                )
            );
    });
};

export const GetOrderDetailController = (
    req: Request,
    res: Response
): void | Response => {
    const { id } = req.user as any;
    const { id: idOrder } = req.params;
    if (!idOrder) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Missing the field",
                    null,
                    new Date()
                )
            );
    }
    GetOrderDetailService(
        {
            idCustomer: id,
            idOrder,
        },
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
                        "Successfully",
                        data,
                        new Date()
                    )
                );
        }
    );
};

export const UpdateStatusOrderController = (req: Request, res: Response) => {
    const { id } = req.user as any;
    const { id: idOrder } = req.params;
    const { status } = req.body;
    if (!idOrder || !status) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Missing the field",
                    null,
                    new Date()
                )
            );
    }
    let _status = ["cancel"];
    if (_status.indexOf(status) === -1) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Invalid status",
                    null,
                    new Date()
                )
            );
    }
    UpdateStatusOrderService(
        {
            idOrder,
            idCustomer: id,
            Status: status,
        },
        (error, data) => {
            if (error) {
                return res
                    .status(HttpCode.INTERNAL_ERROR)
                    .json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            error,
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
