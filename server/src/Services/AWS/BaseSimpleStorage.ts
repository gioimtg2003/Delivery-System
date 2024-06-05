import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AWS_CONFIG } from "../../Configs/aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export class BaseSimpleStorage {
    protected s3Client: S3Client;
    protected s3ClientConfig: S3ClientConfig;
    constructor() {
        this.s3ClientConfig = {
            region: AWS_CONFIG.region,
            credentials: {
                accessKeyId: AWS_CONFIG.accessKeyId as string,
                secretAccessKey: AWS_CONFIG.secretAccessKey as string,
            },
            // endpoint: AWS_CONFIG.endpoint, // prod
        };
        this.s3Client = new S3Client(this.s3ClientConfig);
    }

    public getPresignedUrl({
        bucket,
        key,
        exp,
        content_type,
    }: {
        readonly bucket: string;
        readonly key: string;
        readonly exp: number;
        readonly content_type: string;
    }) {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: content_type,
        });
        return getSignedUrl(this.s3Client, command, { expiresIn: exp });
    }
}
