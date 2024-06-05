"use client";
import { useEffect, useState } from "react";
import { IShipper } from "../type/Shipper";
import { axiosInstance } from "../util/axios";

const ShipperSource = (): IShipper[] => {
    const [shippers, setShippers] = useState<IShipper[]>([]);
    useEffect(() => {
        axiosInstance()
            .get("/admin/shipper")
            .then((res) => {
                if (res.data.status === "success") setShippers(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return shippers;
};

const useShipper = (): IShipper[] => ShipperSource();

export default useShipper;
