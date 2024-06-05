export const AWS_CONFIG = {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SERECT,
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION || "ap-southeast-1",
    bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_IDENTITY || "tmp-filename",
};
