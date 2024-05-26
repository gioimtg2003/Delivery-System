"use client";
import React, { useCallback, useEffect, useState } from "react";
import LoadingComponent from "../ui/components/Loading";
import { useSearchParams } from "next/navigation";
import { VerifyRegister } from "../lib/service/Customer/VerifyRegister";
import Image from "next/image";

interface IParams {
    user: string;
    token: string;
    id: string;
}
export default function Page(): React.ReactElement {
    const [loading, setLoading] = useState<boolean>(true);
    const [params, setParams] = useState<IParams>();
    const searchParams = useSearchParams();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        let user = searchParams.get("user");
        let token = searchParams.get("token");
        let id = searchParams.get("id");
        if (user && token && id) {
            setParams({ user, token, id });
        }
    }, []);
    useEffect(() => {
        if (params) {
            try {
                let verify = new VerifyRegister(
                    params.user,
                    params.token,
                    params.id
                );
                verify
                    .verify()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading(false);
                            setSuccess(true);
                        }, 1000);
                    })
                    .catch(() => {
                        setError(true);
                    });
            } catch {
                setError(true);
            }
        }
    }, [params]);
    const onLoginPage = useCallback(() => {
        location.href = "/login";
    }, []);
    return (
        <main className="w-full">
            <section className="w-full h-screen flex flex-col justify-center items-center">
                <div className="block">
                    {loading && <LoadingComponent content={true} />}
                    {success && (
                        <div className="w-full flex flex-col justify-center items-center hover:cursor-pointer">
                            <Image
                                src="/images/email_verify.png"
                                alt="Verify"
                                width={80}
                                height={80}
                                className="hover:scale-105 transition-all duration-300 "
                            />
                            <p className="text-lg text-primary-2-color mt-4">
                                Xác minh email thành công
                            </p>
                            <button
                                className="py-3 px-5 border-2 border-primary-2-color bg-white   mt-6 font-medium text-primary-1-color/95 rounded-md shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-blue-200"
                                onClick={onLoginPage}
                            >
                                Quay lại trang đăng nhập
                            </button>
                        </div>
                    )}
                    {error && (
                        <div className="text-center">
                            <p className="text-lg text-red-400">
                                Có lỗi xảy ra vui lòng bấm gửi lại email, để xác
                                minh.
                            </p>
                            <button className="py-2 px-4 bg-primary-1-color/95   mt-2 font-medium text-white rounded-md shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-blue-200">
                                Gửi lại email
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
