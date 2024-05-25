"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Flex, Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { AuthProvider } from "../lib/context/auth/authContext";
import { ProtectLogin } from "../lib/context/Protect";

export default function OauthPage(): JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Oauth />
        </Suspense>
    );
}

function Oauth(): JSX.Element {
    const [loading, setLoading] = useState("");
    const searchParams = useSearchParams();
    const exp = searchParams.get("exp");
    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");
        if (accessToken && refreshToken && exp) {
            localStorage.setItem("aT", accessToken);
            localStorage.setItem("rT", refreshToken);
            localStorage.setItem("exp", exp);
            window.location.href = "/dashboard";
        }
    }, []);
    const loading1 = useCallback(() => {
        setLoading("Đang chuyển hướng.");
    }, []);

    const loading2 = useCallback(() => {
        setLoading("Đang chuyển hướng..");
    }, []);

    const loading3 = useCallback(() => {
        setLoading("Đang chuyển hướng...");
    }, []);

    useEffect(() => {
        const interval1 = setInterval(() => {
            loading1();
        }, 500);

        const interval2 = setInterval(() => {
            loading2();
        }, 1000);

        const interval3 = setInterval(() => {
            loading3();
        }, 1500);

        // Clear intervals to prevent memory leaks
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        };
    }, [loading1, loading2, loading3]);

    return (
        <AuthProvider>
            <ProtectLogin>
                <div className="w-full h-screen flex justify-center items-center">
                    <Flex gap="small" vertical className="w-full">
                        <Spin size="large" className="size-36" tip={loading}>
                            <div className="content text-lg" />
                        </Spin>
                    </Flex>
                </div>
            </ProtectLogin>
        </AuthProvider>
    );
}
