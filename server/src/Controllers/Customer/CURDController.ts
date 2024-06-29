import { Request, Response } from "express";
import { GetCustomerByIdService } from "../../Services/Customer/CURDService";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export const GetCustomerByIdController = (
    req: Request,
    res: Response
): void | Response => {
    const { id } = req.user as any;
    GetCustomerByIdService(id, (err, data) => {
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
                    "Get Successfully",
                    data,
                    new Date()
                )
            );
    });
};
