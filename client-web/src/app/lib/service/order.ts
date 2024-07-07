import { CreateOrderType } from "../Types";
import { axiosInstance } from "../util/axios";

export const createOrder = (order: CreateOrderType): Promise<string> => {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .post("/order", order)
            .then((res) => {
                if (res.status === 201) {
                    resolve(res?.data?.message);
                } else {
                    reject(new Error("Error"));
                }
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                        err?.response?.data?.message?.message
                );
            });
    });
};

export const getALlOrder = (
    filter: string,
    page: number | undefined,
    limit: number | undefined
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .get(`/order?filter=${filter}&page=${page}&limit=${limit}`)

            .then((res) => {
                resolve(res?.data?.data);
            })

            .catch((err) => {
                reject("Error while getting order list");
            });
    });
};

export const getCountOrder = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .get("/order/count")

            .then((res) => {
                resolve(res?.data?.data?.count);
            })
            .catch((err) => {
                reject("Error while getting order list");
            });
    });
};
export const getCountFilterOrder = (filter: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .get("/order/count?filter=" + filter)
            .then((res) => {
                resolve(res?.data?.data?.count);
            })
            .catch((err) => {
                reject("Error while getting order list");
            });
    });
};
