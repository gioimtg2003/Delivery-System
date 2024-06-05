import axios, { AxiosInstance } from "axios";
import { useToken } from "../hook/useToken";
import { useEffect } from "react";
import { getServerSideProps } from "../constant/config";

export class Axios {
    getInstance(file?: boolean): AxiosInstance {
        return axios.create({
            baseURL: getServerSideProps().props.API_URI,
            timeout: 10000,
            headers: {
                "Content-Type": file
                    ? "multipart/form-data"
                    : "application/json",
            },
        });
    }
}

export const axiosInstance = (file?: boolean): AxiosInstance => {
    let axiosInit = new Axios().getInstance(file ?? false);
    axiosInit.interceptors.request.use(async (config) => {
        const { accessToken, exp } = useToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${Number(exp) > Date.now() ? accessToken : await grantAccessToken()}`;
        }
        return { ...config };
    });
    axiosInit.interceptors.response.use(
        (response) => {
            const { data } = response;
            if (data?.code === 401) {
                grantAccessToken();
            }
            return response;
        },
        async (error) => {
            if (error.response?.status === 401) {
                await grantAccessToken();
                return axiosInstance(file);
            }
            return Promise.reject(error);
        }
    );
    return axiosInit;
};

export const grantAccessToken = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { refreshToken, setToken } = useToken();
    try {
        let data = await new Axios().getInstance(false).post("/auth/token", {
            token: refreshToken,
        });
        setToken({
            accessToken: data.data.data.access_token,
            refreshToken: data.data.data.refresh_token,
            exp: data.data.data.exp,
        });

        return data.data.data.accessToken;
    } catch (error) {
        // Logout
        console.log(error);
        throw new Error("Refresh token failed");
    }
};

export const useGrantAccessTokenClient = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { refreshToken, setToken } = useToken();
    useEffect(() => {
        grantAccessToken();
    }, []);
};
