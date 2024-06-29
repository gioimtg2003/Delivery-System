import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";
import { BaseSimpleStorage } from "../../Services/AWS/BaseSimpleStorage";

export class GetUrlS3Controller extends BaseController {
    Controller(req: Request, res: Response): Response | void {
        const { url } = req.query;
        if (!url) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Missing url",
                        null,
                        new Date()
                    )
                );
        }
        const bucket = String(url).split("_")[0];
        const key = String(url).split("_")[1];
        // format url: bucket_key
        if (!bucket || !key || bucket.length > 50 || key.length > 50) {
            return res
                .status(HttpCode.BAD_REQUEST)
                .json(
                    FormatApi(
                        HttpCode.BAD_REQUEST,
                        "failed",
                        "Invalid url",
                        null,
                        new Date()
                    )
                );
        }
        const S3 = new BaseSimpleStorage();
        S3.getUrl({
            bucket,
            key,
        })
            .then((url) => {
                return res
                    .status(HttpCode.OK)
                    .json(
                        FormatApi(
                            HttpCode.OK,
                            "success",
                            "Get url success",
                            url,
                            new Date()
                        )
                    );
            })
            .catch((err) => {
                console.error(err);
                return res
                    .status(HttpCode.INTERNAL_ERROR)
                    .json(
                        FormatApi(
                            HttpCode.INTERNAL_ERROR,
                            "error",
                            "Get url Error",
                            err,
                            new Date()
                        )
                    );
            });
    }
}
