import { Request, Response } from "express";
import { IdentityService } from "../../Services/Shipper/Identity";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

const IdentityController = (req: Request, res: Response) => {
    const {
        idShipper,
        ImgDriveLicenseBefore,
        ImgDriveLicenseAfter,
        ImgIdentityCardBefore,
        ImgIdentityCardAfter,
        ImgVehicleRegistrationCertBefore,
        ImgVehicleRegistrationCertAfter,
    } = req.body;

    IdentityService(
        {
            idShipper,
            ImgDriveLicenseBefore,
            ImgDriveLicenseAfter,
            ImgIdentityCardBefore,
            ImgIdentityCardAfter,
            ImgVehicleRegistrationCertBefore,
            ImgVehicleRegistrationCertAfter,
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
            } else {
                return res
                    .status(HttpCode.OK)
                    .json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "Identity Shipper has been updated",
                            null,
                            new Date()
                        )
                    );
            }
        }
    );
};

export { IdentityController };
