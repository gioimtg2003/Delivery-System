import { Request, Response } from "express";
import { listTransport } from "../../Services/Admin/TransportType";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export function ListTransportController(
    req: Request,
    res: Response
): Response | void {
    listTransport((err, data) => {
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
                    "list transport type oke",
                    data,
                    new Date()
                )
            );
    });
}
