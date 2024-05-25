"use client";
import React, { use, useCallback, useEffect, useRef } from "react";
import { useAuth } from "../auth/authContext";
import Link from "next/link";
import style from "./styles.module.css";

export function NotificationIdentity({
    children,
}: {
    readonly children: React.ReactNode;
}): JSX.Element {
    const { user } = useAuth();
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const [isClose, setIsClose] = React.useState<boolean>(false);
    useEffect(() => {
        if (user?.check_verify_user !== undefined) {
            if (user?.check_verify_user === false) {
                setIsOpened(true);
                setIsClose(true);
            } else {
                setIsClose(false);
            }
        }
    }, [user?.check_verify_user]);
    const onClose = useCallback(() => {
        setIsClose(false);
    }, []);

    return (
        <>
            {isOpened && (
                <div
                    className={`fixed w-full h-screen bg-gray-500/20 top-0 left-0 z-[99] flex flex-row justify-center items-center ${isClose ? style.notificationOpen : style.notificationClose}`}
                    onClick={onClose}
                >
                    <div
                        className={`bg-white p-6 rounded-lg shadow-xl shadow-gray-300 max-w-lg max-md:max-w-80 ${isClose ? style.AnimationPopUpOpen : style.AnimationPopUpClose}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <h1 className="text-xl font-bold text-center">
                            Định danh tài khoản
                        </h1>
                        <p className="text-md text-gray-500 mt-10 text-center">
                            Bạn cần định danh tài khoản để sử dụng các dịch vụ
                            của chúng tôi, vui lòng cung cấp căn cước công dân
                            mặt trước và mặt sau của bạn.
                        </p>
                        <div
                            className={`text-center flex flex-row justify-center items-center ${!isClose && style.notificationClose} `}
                        >
                            <Link href="/settings/identity" onClick={onClose}>
                                <button className="mt-10 py-3 px-8 bg-white rounded-lg text-blue-400 border-2 hover:duration-500 border-blue-400 shadow-md hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-1 shadow-blue-200 font-medium text-md ">
                                    Xác thực ngay
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {children}
        </>
    );
}
