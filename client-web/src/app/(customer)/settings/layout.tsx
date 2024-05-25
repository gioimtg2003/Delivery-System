"use client";
import NavSetting from "@/app/ui/components/NavSetting/NavSetting";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, { createContext } from "react";

const messageProvider = createContext<any>(null);

export const useMessageContext = (): MessageInstance => {
    const context = React.useContext(messageProvider);
    if (!context) {
        throw new Error(
            "useMessageContext must be used within a MessageProvider"
        );
    }
    return context;
};
export default function SettingsLayout({
    children,
}: {
    readonly children: React.ReactNode;
}): React.ReactElement {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <section className="w-full flex flex-row justify-center items-start max-md:flex-col">
            <NavSetting />
            <messageProvider.Provider value={messageApi}>
                {contextHolder}
                <article className="w-3/4 max-md:w-full">{children}</article>
            </messageProvider.Provider>
        </section>
    );
}
