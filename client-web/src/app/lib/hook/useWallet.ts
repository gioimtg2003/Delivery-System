"use client";

import { useEffect, useState } from "react";
import { IWallet } from "../type/Wallet";
import { axiosInstance } from "../util/axios";

const useWallet = (loading: boolean) => {
    const [state, setState] = useState<IWallet[]>([]);
    useEffect(() => {
        (async () => {
            try {
                let data = await axiosInstance().get("/admin/shipper/wallet");
                if (data.data.status === "success") setState(data.data.data);
            } catch (error) {
                throw new Error(error as string);
            }
        })();
    }, [loading]);
    return [state];
};

export default useWallet;
