import { Request, Response } from "express";
import {
    GETDriverByIdService,
    UpdateStatusService,
} from "../../Services/Shipper/CURD";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export function GetDriverByIdController(req: Request, res: Response) {
    const { id } = req.user as any;
    GETDriverByIdService(Number(id), (err, driver) => {
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
                    "Driver found",
                    driver,
                    new Date()
                )
            );
    });
}

export function UpdateStatusController(req: Request, res: Response) {
    const { id } = req.user as any;
    const { online, latitude, longitude } = req.body;
    if (online === undefined || typeof online !== "boolean") {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "Online is required",
                    null,
                    new Date()
                )
            );
    }
    if (online === true && (!latitude || !longitude)) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "Coordinates are required",
                    null,
                    new Date()
                )
            );
    }
    UpdateStatusService(
        { online, id, coordinates: `${latitude},${longitude}` },
        (err, result) => {
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
                        "Update status",
                        result,
                        new Date()
                    )
                );
        }
    );
}
