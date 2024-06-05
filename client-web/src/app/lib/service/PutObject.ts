import { RcFile } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";

const PutObject = (file: RcFile, url: string): Promise<boolean> => {
    return new Promise((res, rej) => {
        try {
            let config: AxiosRequestConfig = {
                method: "PUT",
                url: url,
                data: file,
                headers: {
                    "Content-Type": "image/jpeg",
                    "Content-Length": new Blob([file]).size,
                    Accept: "*/*",
                },
            };
            axios
                .request(config)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        res(true);
                    } else {
                        rej(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    rej(false);
                });
        } catch (error) {
            console.error(error);
            rej(false);
        }
    });
};

export default PutObject;
