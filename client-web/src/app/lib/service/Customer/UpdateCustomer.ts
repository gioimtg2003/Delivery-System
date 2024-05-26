import { axiosInstance } from "../../util/axios";

export const UpdateCustomer = <T>(data: T): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .put("/customer", data)
            .then((res) => {
                if (res.data.code === 200) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch(() => reject(false));
    });
};
