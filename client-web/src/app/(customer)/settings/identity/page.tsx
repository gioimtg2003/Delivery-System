"use client";
import { useAuth } from "@/app/lib/context/auth/authContext";
import { axiosInstance } from "@/app/lib/util/axios";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { Image as AntdImage } from "antd";
import { AuthActionType, Identity } from "@/app/lib/context/auth/type";
import { GetSignedUrl } from "@/app/lib/service/Aws/GetSignedUrl";
import { AWS_CONFIG } from "@/app/lib/constant/aws";
import LoadingComponent from "@/app/ui/components/Loading";
import { useMessageContext } from "../layout";

export default function IdentityPage(): JSX.Element {
    const [identityCardBefore, setIdentityCardBefore] =
        useState<FileList | null>(null);
    const [identityCardAfter, setIdentityCardAfter] = useState<FileList | null>(
        null
    );
    const refCardBefore = React.useRef<HTMLInputElement>(null);
    const refCardAfter = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { user, dispatch } = useAuth();
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const message = useMessageContext();

    useEffect(() => {
        if (
            user?.user_identity?.imgIdentityCardBack &&
            user?.user_identity?.imgIdentityCardFront
        ) {
            let getUrl = new GetSignedUrl();
            (async () => {
                setIdentity({
                    imgIdentityCardFront: await getUrl.ConvertUrl(
                        AWS_CONFIG.bucket as string,
                        user?.user_identity?.imgIdentityCardFront as string
                    ),
                    imgIdentityCardBack: await getUrl.ConvertUrl(
                        AWS_CONFIG.bucket as string,
                        user?.user_identity?.imgIdentityCardBack as string
                    ),
                });
            })();
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [user?.user_identity]);
    useEffect(() => {
        if (identityCardBefore && identityCardAfter) {
            setIsUploading(true);
        }
    }, [identityCardBefore, identityCardAfter]);

    const identityStatus = useMemo(() => {
        if (
            user?.user_identity !== undefined &&
            user?.check_verify_user === false
        ) {
            return "Thông tin của bạn đang được xử lý, Vui lòng chờ xác minh thông tin của bạn";
        } else if (
            user?.user_identity === undefined &&
            user?.check_verify_user === false
        ) {
            return "Vui lòng cập nhật thông tin để xác minh";
        } else if (user?.check_verify_user === true) {
            return "Xác minh thành công";
        }
    }, [user]);

    const handleUploadIdentity = useCallback(() => {
        setLoading(true);
        if (identityCardBefore && identityCardAfter) {
            let formData = new FormData();
            formData.append("user_identity_before", identityCardBefore[0]);
            formData.append("user_identity_after", identityCardAfter[0]);
            axiosInstance(true)
                .post("/customer/identity", formData)
                .then((res) => {
                    message.success(
                        "Cập nhật thành công, vui lòng chờ chúng tôi xử lý."
                    );
                    setTimeout(() => {
                        dispatch({ type: AuthActionType.RELOAD });
                        setIsUploading(false);
                    }, 1500);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [identityCardBefore, identityCardAfter]);

    const identityCardBeforeSrc = useMemo(() => {
        if (identityCardBefore) {
            if (identityCardBefore[0] !== undefined) {
                return URL.createObjectURL(identityCardBefore?.[0]);
            }
        }
    }, [identityCardBefore]);
    return loading ? (
        <div className="w-full h-nav-setting flex flex-row justify-center items-center">
            <LoadingComponent />
        </div>
    ) : (
        <div className="w-full mt-4">
            <p className="text-center text-lg font-medium">{identityStatus}</p>
            <div className="w-full flex flex-row max-sm:flex-col justify-center items-center mt-10 px-8">
                <AntdImage.PreviewGroup>
                    <div className="w-1/2 max-sm:w-full flex flex-row  justify-center items-center mt-10 ">
                        {identity ? (
                            <AntdImage
                                src={identity.imgIdentityCardFront}
                                alt="CCCD mặt trước"
                                width={250}
                            />
                        ) : (
                            <div
                                className="relative w-1/2 max-md:w-10/12 max-xl:w-3/4 max-lg:w-3/4 max-sm:w-full h-56 border-2 border-blue-300 rounded-lg shadow-md shadow-blue-200 flex flex-col justify-center items-center cursor-pointer"
                                onClick={() => {
                                    refCardBefore.current?.click();
                                }}
                            >
                                <Image
                                    src={
                                        identityCardBeforeSrc ??
                                        "/image/LogoIntro.png"
                                    }
                                    alt="CCCD/CMND Mặt trước"
                                    objectFit="contain"
                                    fill
                                    className={`w-full h-full rounded-lg object-contain ${!identityCardBefore && "hidden"}`}
                                />
                                <div
                                    className={`flex flex-col justify-center items-center ${identityCardBefore && "hidden"}`}
                                >
                                    <FaRegAddressCard
                                        size={36}
                                        className="text-blue-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-500 hover:text-blue-400 ">
                                        CCCD/CMND Mặt trước
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            if (e.target.files.length > 0) {
                                                console.log(e.target.files);
                                                setIdentityCardBefore(
                                                    e.target.files
                                                );
                                            }
                                        }
                                    }}
                                    className="hidden"
                                    ref={refCardBefore}
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-1/2 max-sm:w-full flex flex-row justify-center items-center mt-10 ">
                        {identity ? (
                            <AntdImage
                                src={identity.imgIdentityCardBack}
                                alt="CCCD mặt sau"
                                width={250}
                            />
                        ) : (
                            <div
                                className="relative w-1/2 max-md:w-10/12 max-xl:w-3/4 max-lg:w-3/4 max-sm:w-full h-56 border-2 border-blue-300 rounded-lg shadow-md shadow-blue-200 flex flex-col justify-center items-center cursor-pointer"
                                onClick={() => {
                                    refCardAfter.current?.click();
                                }}
                            >
                                <Image
                                    src={
                                        identityCardAfter
                                            ? URL.createObjectURL(
                                                  identityCardAfter?.[0]
                                              )
                                            : "/image/LogoIntro.png"
                                    }
                                    alt="CCCD/CMND Mặt Sau"
                                    objectFit="contain"
                                    fill
                                    className={`w-full h-full rounded-lg object-contain ${!identityCardAfter && "hidden"}`}
                                />
                                <div
                                    className={`flex flex-col justify-center items-center ${identityCardAfter && "hidden"}`}
                                >
                                    <FaRegAddressCard
                                        size={36}
                                        className="text-blue-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-500 hover:text-blue-400 ">
                                        CCCD/CMND Mặt sau
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            if (e.target.files.length > 0) {
                                                setIdentityCardAfter(
                                                    e.target.files
                                                );
                                            }
                                        }
                                    }}
                                    className="hidden"
                                    ref={refCardAfter}
                                />
                            </div>
                        )}
                    </div>
                </AntdImage.PreviewGroup>
            </div>
            <div className="w-full text-end  pb-6 pr-14 mt-16">
                {isUploading && (
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-400 font-medium shadow-lg shadow-blue-200 border-2 border-blue-400 hover:bg-white text-white hover:text-blue-500 rounded-md hover:cursor-pointer hover:duration-300 hover:ease-linear hover:-translate-y-1"
                        onClick={handleUploadIdentity}
                    >
                        Cập nhật định danh
                    </button>
                )}
            </div>
        </div>
    );
}
