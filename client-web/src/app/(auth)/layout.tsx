"use client";
import HomeLayout from "../ui/layout/Home";
import { NotificationProvider } from "@/app/lib/context/NotificationContext";
import { ProtectLogin } from "../lib/context/Protect";
import { AuthProvider } from "../lib/context/auth/authContext";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element | void {
    return (
        <NotificationProvider>
            <AuthProvider>
                <ProtectLogin>
                    {<HomeLayout>{children}</HomeLayout>}
                </ProtectLogin>
            </AuthProvider>
        </NotificationProvider>
    );
}
