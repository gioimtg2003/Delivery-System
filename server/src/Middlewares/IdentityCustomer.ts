import { Request } from "express";
import { IncomingForm, Options } from "formidable";
import { Transform } from "stream";
import { UploadSimpleStorage } from "../Services/AWS/UploadSimpleStorage";
import { renameSync, rename } from "fs";
export const IdentityCustomer = (req: Request): Promise<any> => {
    return new Promise((resolve, reject) => {
        let cancelUpload = false;
        const options: Options = {
            maxFileSize: 5 * 1024 * 1024,
            multiples: true,
            allowEmptyFiles: false,
            maxFields: 2,
            maxFiles: 2,
            filter: ({ name, originalFilename, mimetype }) => {
                const valid = mimetype && mimetype.includes("image");
                if (!valid) {
                    cancelUpload = true;
                    form.emit("data", {
                        value: "error",
                        formname: name,
                        name: "file",
                        key: "file is not an image",
                    });
                }
                return (valid as boolean) && !cancelUpload;
            },
        };
        let form = new IncomingForm(options);

        form.parse(req, (err, fields, files) => {
            const { user_identity_before, user_identity_after } = files as any;
            if (!user_identity_before || !user_identity_after) {
                form.emit("data", {
                    value: "error",
                    formname: undefined,
                    name: "file",
                    key: "user_identity_before or user_identity_after is missing",
                });
            } else if (
                user_identity_before.size > 5 * 1024 * 1024 ||
                user_identity_after.size > 5 * 1024 * 1024
            ) {
                form.emit("data", {
                    value: "error",
                    formname: undefined,
                    name: "file",
                    key: "user_identity_before or user_identity_after is too large",
                });
            }
            req.body = {
                ...req.body,
                user_identity_before: user_identity_before[0].newFilename,
                user_identity_after: user_identity_after[0].newFilename,
            };
            form.emit("data", {
                formname: "",
                name: "file",
                value: "success",
            });
            console.log(user_identity_before[0]);
        });

        form.on("error", (err) => {
            reject(err);
        });

        form.on("data", (data) => {
            if (data.value === "success") {
                resolve(data);
            } else {
                reject(data);
            }
        });

        form.on("fileBegin", (name, file: any) => {
            if (
                name === "user_identity_before" ||
                name === "user_identity_after"
            ) {
                file.newFilename = `${Date.now().toString()}-${
                    file.originalFilename
                }`;
                file.open = function () {
                    this._writeStream = new Transform({
                        transform(chunk, encoding, callback) {
                            callback(null, chunk);
                        },
                    });
                    this._writeStream.on("error", (err: any) =>
                        form.on("error", err)
                    );
                    let Upload = new UploadSimpleStorage(
                        file.newFilename,
                        this._writeStream,
                        "identity-card-customer"
                    );
                    Upload.uploadFile()
                        .then(() => {})
                        .catch((err) => {
                            form.emit("data", {
                                value: "error",
                                formname: name,
                                name: "file",
                                key: "upload error",
                            });
                        });
                };
            } else {
                form.emit("data", {
                    value: "error",
                    formname: name,
                    name: "file",
                    key: "invalid name",
                });
            }
        });
    });
};
