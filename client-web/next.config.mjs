/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "apishippy.nguyenconggioi.me",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
