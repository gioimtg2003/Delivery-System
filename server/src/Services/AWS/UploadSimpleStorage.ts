import { Log } from "../../Lib/Utils/Log";
import { BaseSimpleStorage } from "./BaseSimpleStorage";
import { Upload, Options as UploadOptions } from "@aws-sdk/lib-storage";
export class UploadSimpleStorage extends BaseSimpleStorage {
    private bucketName: string;
    private key: string;
    private file: any;
    private options: UploadOptions | undefined;
    private upload: Upload | undefined;
    constructor(key: string, file: any, bucketName: string) {
        super();
        this.bucketName = bucketName;
        this.key = key;
        this.file = file;
        this.initUpload();
    }

    private initUpload() {
        this.options = {
            client: this.s3Client,
            params: {
                Bucket: this.bucketName,
                Key: this.key,
                Body: this.file,
            },
            queueSize: 2,
            partSize: 5 * 1024 * 1024,
            leavePartsOnError: false,
        };
        this.upload = new Upload(this.options);
    }

    public uploadFile(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this?.upload
                ?.done()
                .then(() => {
                    Log.Info(
                        new Date(),
                        "success",
                        "Update file to S3",
                        "AWS Storage"
                    );
                    resolve(true);
                })
                .catch((err) => {
                    Log.Error(new Date(), err, "AWS Storage");
                    reject(err);
                });
        });
    }
}
