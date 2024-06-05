import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../BaseController";
import { BaseSimpleStorage } from "../../Services/AWS/BaseSimpleStorage";
import { HttpCode } from "../../Lib/Constants/HttpCode";
import { FormatApi } from "../../Lib/Utils/FormatApi";

export class SignUrlS3Controller extends BaseController {
    Controller(
        req: Request,
        res: Response<any, Record<string, any>>
    ): Response<any, Record<string, any>> | void {
        const { fileName, typeImg, contentType, id } = req.body;
        console.log("req.body", req.body);
        if (!fileName || !typeImg || !contentType || !id) {
            return res.status(HttpCode.BAD_REQUEST).json({
                message: "Bad Request",
            });
        }
        const _fileName = String(fileName).replace(/\s/g, "");
        const _typeImg = _fileName.split(".").pop();
        const S3 = new BaseSimpleStorage();
        const KEY = typeImg + "_" + `${id}-${Date.now()}.${_typeImg}`;
        S3.getPresignedUrl({
            bucket: "tmp-filename",
            key: KEY,
            exp: 30,
            content_type: contentType,
        })
            .then((url) => {
                return res.status(HttpCode.OK).json(
                    FormatApi(
                        HttpCode.OK,
                        "success",
                        "Sign url success",
                        {
                            url,
                            key: KEY,
                        },
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
                            "Sign url Error",
                            err,
                            new Date()
                        )
                    );
            });
    }
}
