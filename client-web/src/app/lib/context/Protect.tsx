"use client";
import { useAuth } from "./auth/authContext";

export const ProtectProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isAuthenticated === false && isLoading === false) {
        //console.log("protectttt success", isAuthenticated);
        window.location.href = "/login";
    }

    return <>{children}</>;
};

export const ProtectLogin: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    if (isAuthenticated && isLoading === false) {
        window.location.href = "/create-order";
    }
    return <>{children}</>;
};
