import { Request, Response } from "express";
import { HttpCode } from "../../../Lib/Constants/HttpCode";
import { FormatApi } from "../../../Lib/Utils/FormatApi";
import { SaveIdentity } from "../../../Services/Admin/Shipper/IdentityShipper";
import { IShipperIdentity } from "../../../Lib/Types/Shipper";

export function SaveIdentityController(req: Request, res: Response) {
    const data: IShipperIdentity = req.body;
    const {
        idShipper,
        ImgDriveLicenseBefore,
        ImgDriveLicenseAfter,
        ImgIdentityCardAfter,
        ImgIdentityCardBefore,
        ImgVehicleRegistrationCertBefore,
        ImgVehicleRegistrationCertAfter,
    } = data;

    if (
        !idShipper ||
        !ImgDriveLicenseBefore ||
        !ImgDriveLicenseAfter ||
        !ImgIdentityCardAfter ||
        !ImgIdentityCardBefore ||
        !ImgVehicleRegistrationCertBefore ||
        !ImgVehicleRegistrationCertAfter
    ) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json(
                FormatApi(
                    HttpCode.BAD_REQUEST,
                    "error",
                    "Data is required",
                    null,
                    new Date()
                )
            );
    }
    SaveIdentity(data, (err, data) => {
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
                .status(HttpCode.INTERNAL_ERROR)
                .json(
                    FormatApi(
                        HttpCode.INTERNAL_ERROR,
                        "error",
                        data.msg,
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
                    "Save identity successfully",
                    data,
                    new Date()
                )
            );
    });
}
