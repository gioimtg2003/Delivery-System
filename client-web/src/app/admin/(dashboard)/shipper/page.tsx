"use client";
import { Tabs, TabsProps } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { TabBarExtraContent } from "rc-tabs/lib/interface";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { ModalPopUp } from "@/app/ui/components/modal/ModalPopUp";
import StepShipper from "@/app/ui/components/StepShipper/StepShipper";
import TableShipper from "@/app/ui/components/TableShipper";
import { ShipperProvider } from "@/app/lib/context/Shipper/Context";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Tài xế",
        children: <TableShipper />,
        icon: <UserOutlined />,
    },
    {
        key: "2",
        label: ".",
        children: <div className="w-full h-full">Content of Tab Pane 2</div>,
        icon: <ClockCircleOutlined />,
    },
];

export default function ShipperAdminPage(): React.ReactElement {
    const [close, setClose] = useState<boolean>(true);
    const onClosePopup = useCallback(() => {
        setClose(!close);
    }, [close]);

    const operations: TabBarExtraContent = useMemo(
        () => (
            <button
                className="bg-blue-500 px-6 py-2 rounded-md text-white font-normal"
                onClick={() => {
                    setClose(false);
                }}
            >
                Thêm mới
            </button>
        ),
        [setClose]
    );

    return (
        <ShipperProvider>
            <ModalPopUp onClose={onClosePopup} className="" close={close}>
                <div className="w-full py-4 px-6">
                    <StepShipper closeModal={setClose} />
                </div>
            </ModalPopUp>
            <div className="w-full min-w-[850px] h-full px-6 py-12 flex flex-row justify-center items-start">
                <div className="rounded-sm w-full bg-white p-4 shadow-lg shadow-gray-200">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        size="large"
                        tabBarExtraContent={operations}
                    />
                </div>
            </div>
        </ShipperProvider>
    );
}
