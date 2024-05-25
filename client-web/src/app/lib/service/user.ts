import { AddEmployeeFieldType, ResponseError, ResponseSuccess } from "../Types";
import { Axios, axiosInstance } from "../util/axios";
const axios = new Axios().getInstance();

export function Register(data: any): Promise<ResponseSuccess | ResponseError> {
    return new Promise((resolve, reject) => {
        axios
            .post("/auth/register/customer", {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: `0${data.phone}`,
                shop_name: data.shop_name,
                re_password: data.re_password,
            })
            .then((res: any) => {
                resolve(res?.data);
            })
            .catch((err: any) => {
                reject(err.response.data);
            });
    });
}

export function AddEmployee(
    data: AddEmployeeFieldType
): Promise<ResponseSuccess | ResponseError> {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .post("/user/shop/employee", {
                Email: data.Email,
                Name: data.firstName + " " + data.lastName,
                Phone: data.Phone,
                Address: data.Address,
                Position: data.position,
            })
            .then((res: any) => {
                resolve(res?.data);
            })
            .catch((err: any) => {
                reject(err.response?.data);
            });
    });
}
