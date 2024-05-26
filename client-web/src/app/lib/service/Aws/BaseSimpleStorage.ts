import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AWS_CONFIG } from "../../constant/aws";

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
}
