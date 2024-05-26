"use client";
import React, { useMemo } from "react";
import { notification } from "antd";

export const NotificationContext = React.createContext(null as any);
export const useNotification = () => React.useContext(NotificationContext);
export function NotificationProvider({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const [apiNotification, contextHolder] = notification.useNotification();
    const NotificationContextProviderValue = useMemo(
        () => ({
            apiNotification,
        }),
        [apiNotification]
    );

    return (
        <>
            {contextHolder}
            <NotificationContext.Provider
                value={NotificationContextProviderValue}
            >
                {children}
            </NotificationContext.Provider>
        </>
    );
}
