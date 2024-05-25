import { GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import { BaseSimpleStorage } from "./BaseSimpleStorage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class GetSignedUrl extends BaseSimpleStorage {
    constructor() {
        super();
    }

    /**
     * ConvertUrl
     */
    public ConvertUrl(bucket: string, key: string): Promise<string> {
        const commandInput = {
            Bucket: bucket,
            Key: key,
        };

        let command = new GetObjectCommand(commandInput);
        return new Promise((res, rej) => {
            getSignedUrl(this.s3Client, command, { expiresIn: 60 * 30 })
                .then((url) => res(url))
                .catch((err) => rej(err));
        });
    }
}
