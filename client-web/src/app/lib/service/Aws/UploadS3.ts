import https from "https";
import { AWS_CONFIG } from "../../constant/aws";

// export const createPresignedUrl = ({
//     region,
//     bucket,
//     key,
// }: {
//     readonly region: string;
//     readonly bucket: string;
//     readonly key: string;
// }) => {
//     console.log(region, bucket, key);
//     const client = new S3Client({
//         region,
//         credentials: {
//             accessKeyId: String(AWS_CONFIG.accessKeyId),
//             secretAccessKey: String(AWS_CONFIG.secretAccessKey),
//         },
//     });
//     const command = new PutObjectCommand({ Bucket: bucket, Key: key });
//     return getSignedUrl(client, command, { expiresIn: 900 });
// };

export function putObject(url: string, data: any) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            url,
            {
                method: "PUT",
                headers: {
                    "Content-Length": new Blob([data]).size,
                    "Content-Type": "image/jpeg",
                },
            },
            (res) => {
                let responseBody = "";
                res.on("data", (chunk) => {
                    console.log(chunk);
                    responseBody += chunk;
                });
                res.on("end", () => {
                    resolve(responseBody);
                });
            }
        );
        req.on("error", (err) => {
            console.error(err);
            reject(err);
        });
        req.write(data);
        req.end();
    });
}
