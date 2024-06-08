import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const client = new S3Client();

function ISBUCKET(bucket) {
    return ["imgidentity", "imgdrivelicense", "imgvehicleregistrationcert"].includes(bucket)
}

export const handler = async (event, context) => {
    try {
        const BUCKET = event.Records[0].s3.bucket.name;
        const KEY = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
        if (!ISBUCKET(String(KEY).split('-')[0])) {
            context.fail('Bucket Not Found');
        }
        const commandGet = new GetObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
        });

        let object;
        try {
            object = await client.send(commandGet);
        } catch (getError) {
            console.error(`Error getting object: ${getError.message}`);
            context.fail(`Error getting object: ${getError.message}`);
        }

        if (isImageContentType(object.ContentType)) {
            console.log(`Processing image: ${KEY} from bucket: ${BUCKET}`);

            const keyParts = String(KEY).split('-');
            const destinationBucket = keyParts[0] ? keyParts[0].toLowerCase() : BUCKET;
            const destinationKey = keyParts[1];

            if (destinationBucket && destinationKey) {
                const upload = new Upload({
                    client,
                    params: {
                        Bucket: destinationBucket,
                        Key: destinationKey,
                        Body: object.Body,
                    },
                    tags: [
                        /*...*/
                    ], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                });
                try {
                    await upload.done();
                } catch (putError) {
                    console.error(`Error putting object: ${putError.message}`);
                    context.fail(`Error putting object: ${putError.message}`);
                }
            } else {
                context.fail(`Invalid key format: ${KEY}`);
            }

            try {
                await client.send(new DeleteObjectCommand({
                    Bucket: BUCKET,
                    Key: KEY,
                }));
            } catch (deleteError) {
                console.error(`Error deleting object: ${deleteError.message}`);
                context.fail(`Error deleting object: ${deleteError.message}`);

            }
        } else {
            try {
                await client.send(new DeleteObjectCommand({
                    Bucket: BUCKET,
                    Key: KEY,
                }));
            } catch (deleteError) {
                console.error(`Error deleting object: ${deleteError.message}`);
                context.fail(`Error deleting object: ${deleteError.message}`);

            }
        }
    } catch (err) {
        console.error(`Error handling file: ${err.message}`);
        context.fail(`Error handling file: ${err.message}`);
    }
};

function isImageContentType(contentType) {
    const imageMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
    ];
    return imageMimeTypes.includes(contentType.toLowerCase());
}
