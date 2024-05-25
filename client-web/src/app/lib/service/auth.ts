import { setToken } from "../hook/useToken";
import { Axios } from "../util/axios";

const axios = new Axios().getInstance();

interface LoginProps {
    email: string | undefined;
    password: string | undefined;
}

export function Login(data: LoginProps, message: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/login/customer", {
                email: data.email,
                password: data.password,
            })
            .then((res: any) => {
                let data = {
                    accessToken: res.data.data.access_token,
                    refreshToken: res.data.data.refresh_token,
                    exp: res.data.data.exp,
                };
                setToken(data);
                message.success("Login success!");
                resolve(true);
            })
            .catch((err: any) => {
                message.open({
                    type: "error",
                    content: err.response.data?.message || "Login failed!",
                    duration: 3,
                });
                reject(false);
            });
    });
}
