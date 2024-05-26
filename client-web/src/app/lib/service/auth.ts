import { setToken } from "../hook/useToken";
import { Axios } from "../util/axios";

const axios = new Axios().getInstance();

interface LoginProps {
    Email: string | undefined;
    Password: string | undefined;
}

export function Login(data: LoginProps, message: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/login/customer", {
                email: data.Email,
                password: data.Password,
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

export function SignInAdmin(data: LoginProps, message: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios
            .post("/admin/auth/sign-in", {
                Email: data.Email,
                Password: data.Password,
            })
            .then((res: any) => {
                if (res.data.status === "success") {
                    let data = {
                        accessToken: res.data.data.access_token,
                        refreshToken: res.data.data.refresh_token,
                        exp: res.data.data.exp,
                    };
                    setToken(data);
                    message.success({
                        message: "Đăng nhập thành công!",
                        duration: 3,
                    });
                    resolve(true);
                } else {
                    message.error({
                        message: res.data.message || "Đăng nhập thất bại!",
                        duration: 3,
                    });
                    reject(false);
                }
            })
            .catch((err: any) => {
                console.error(err);
                message.error({
                    message: err.response.data.message || "Đăng nhập thất bại!",
                    duration: 3,
                });
                reject(false);
            });
    });
}
