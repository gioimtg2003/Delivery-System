"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "../util/axios";
import { IAddress } from "../type/Address";
export interface IProvince {
    _id?: string;
    province_id: string;
    province_name: string;
    province_type: string;
    lat: number;
    lng: number;
}

export const useProvince = () => {
    const [province, setProvince] = useState<IAddress[]>([]);
    useEffect(() => {
        axiosInstance()
            .get("/address?pid=")
            .then((res) => {
                setProvince(res.data.data);
            });
    }, []);
    return province;
};
