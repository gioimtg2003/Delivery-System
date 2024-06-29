import { Request, Response } from "express";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { TransportCost } from "../../Services/Customer/Transport.service";

export function TransportCostController(
    req: Request,
    res: Response
): void | Response {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Thiếu thông tin",
                    null,
                    new Date()
                )
            );
    }
    const [senderLat, senderLng] = String(origin)
        .toString()
        .split(",")
        .map(Number);
    const [receiverLat, receiverLng] = String(destination)
        .toString()
        .split(",")
        .map(Number);
    if (!senderLat || !senderLng || !receiverLat || !receiverLng) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "failed",
                    "Format dữ liệu không đúng",
                    null,
                    new Date()
                )
            );
    }

    TransportCost(
        {
            senderLat,
            senderLng,
            receiverLat,
            receiverLng,
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
}
