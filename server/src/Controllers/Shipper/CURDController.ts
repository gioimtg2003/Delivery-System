import { Request, Response } from "express";
import { GETDriverByIdService } from "../../Services/Shipper/CURD";
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
