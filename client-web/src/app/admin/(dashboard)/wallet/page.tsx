"use client";
import { WalletProvider } from "@/app/lib/context/Wallet/Context";
import TableHistoryWallet from "@/app/ui/components/TableWallet/TableHistoryWallet";
import TableWallet from "@/app/ui/components/TableWallet/TableWallet";
import { ClockCircleOutlined, WalletOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import React from "react";
const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Yêu cầu",
        children: <TableWallet />,
        icon: <WalletOutlined />,
    },
    {
        key: "2",
        label: "Lịch sử",
        children: <TableHistoryWallet />,
        icon: <ClockCircleOutlined />,
    },
];
const WalletPage = (): React.ReactElement => {
    return (
        <WalletProvider>
            <div className="w-full flex flex-row justify-center align-center mt-10 ">
                <div className="w-5/6 py-12 px-8 bg-white rounded-md shadow-md">
                    <Tabs defaultActiveKey="1" items={items} size="large" />
                </div>
            </div>
        </WalletProvider>
    );
};

export default WalletPage;
