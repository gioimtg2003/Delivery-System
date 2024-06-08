"use client";
import { Image, message } from "antd";
import { MdOutlineAttachEmail, MdOutlinePermPhoneMsg } from "react-icons/md";
import ImageNext from "next/image";
import { getServerSideProps } from "@/app/lib/constant/config";
import { useCallback, useEffect, useState } from "react";
import { IShipper, IShipperIdentity } from "@/app/lib/type/Shipper";
import { axiosInstance } from "@/app/lib/util/axios";
import { ITransportType } from "@/app/lib/type/TransportType";
import LoadingComponent from "@/app/ui/components/Loading";
export default function PageVerifyShipper({
    params,
}: {
    readonly params: { idShipper: string };
}) {
    const [shipper, setShipper] = useState<
        (IShipper & IShipperIdentity & ITransportType) | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axiosInstance()
            .get("/admin/shipper/verify/" + params.idShipper)
            .then((res) => {
                if (res.data.status === "success") {
                    setShipper(res.data.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 800);
                }
            })
            .catch((err) => {
                message.error("Có lỗi xảy ra!");
            });
    }, [setShipper, params.idShipper]);

    const accept = useCallback(() => {
        axiosInstance()
            .put("/admin/shipper/verify", {
                id: shipper?.id,
                verify: true,
            })
            .then((res) => {
                if (res.data.status === "success") {
                    message.success("Xác nhận thành công");
                    setTimeout(() => {
                        window.document.location.href = "/admin/verify";
                    }, 1000);
                } else {
                    message.error("Có lỗi xảy ra!");
                }
            })
            .catch((err) => {
                message.error("Có lỗi xảy ra!");
            });
    }, [shipper]);

    const reject = useCallback(() => {
        axiosInstance()
            .put("/admin/shipper/verify", {
                id: shipper?.id,
                verify: false,
            })
            .then((res) => {
                if (res.data.status === "success") {
                    message.success("Đã từ chối tài xế này!");
                    setTimeout(() => {
                        window.document.location.href = "/admin/verify";
                    }, 1000);
                } else {
                    message.error("Có lỗi xảy ra!");
                }
            })
            .catch((err) => {
                message.error("Có lỗi xảy ra!");
            });
    }, [shipper]);
    return (
        <div className="w-full min-h-[750px] flex flex-row justify-center items-center p-8">
            {loading ? (
                <LoadingComponent content={true} />
            ) : (
                <div className="w-11/12 flex flex-row justify-center  rounded-md bg-white">
                    <div className="w-2/6 flex flex-col border-r-2 border-gray-400 px-2 py-8">
                        <div className="text-left text-lg">
                            <p>{shipper?.Name}</p>
                        </div>
                        <div className="text-left text-sm text-wrap text-gray-500">
                            <p>
                                {`${shipper?.Hamlet ? shipper.Hamlet + "," : ""} ${shipper?.Ward}, ${shipper?.District}, ${shipper?.Province}`}
                            </p>
                        </div>
                        <div className="w-full h-[1px] border-2 border-gray-200"></div>
                        <div className="w-full flex flex-row mt-4 items-center justify-start">
                            <MdOutlineAttachEmail className="mr-2" />
                            <p className="text-gray-600 font-medium">
                                {shipper?.Email}
                            </p>
                        </div>
                        <div className="w-full flex flex-row items-center justify-start">
                            <MdOutlinePermPhoneMsg className="mr-2" />
                            <p className="text-gray-500">{shipper?.Phone}</p>
                        </div>
                        <div className="w-full flex flex-row items-start mt-6">
                            <ImageNext
                                src={`${getServerSideProps().props.API_URI}/images/${shipper?.ImgUrl}`}
                                width={64}
                                height={64}
                                alt="transport"
                                className="mr-3"
                            />
                            <p>{shipper?.TransportName}</p>
                        </div>
                        <div className="w-full h-[1px] border-[1px] border-gray-300"></div>
                        <div className="w-full px-2">
                            <button
                                className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
                                onClick={accept}
                            >
                                Xác nhận
                            </button>
                        </div>
                        <div className="w-full px-2">
                            <button
                                className="w-full text-red-500 bg-white border-2 border-red-300 p-2 rounded-md mt-4"
                                onClick={reject}
                            >
                                Từ Chối
                            </button>
                        </div>
                    </div>
                    <div className="w-4/6 px-4 py-6 ">
                        <div className="w-full text-left my-4 text-xl font-normal font-mono">
                            <p>Hình ảnh CCCD</p>
                        </div>

                        <Image.PreviewGroup>
                            <div className="w-full flex flex-row justify-center items-center">
                                <Image
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                    className="p-4"
                                />
                                <Image
                                    className="p-4"
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                />
                            </div>
                        </Image.PreviewGroup>
                        <div className="w-full text-left my-4 text-xl font-normal font-mono">
                            <p>Hình ảnh GPLX</p>
                        </div>

                        <Image.PreviewGroup>
                            <div className="w-full flex flex-row justify-center items-center">
                                <Image
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                    className="p-4"
                                />
                                <Image
                                    className="p-4"
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                />
                            </div>
                        </Image.PreviewGroup>
                        <div className="w-full text-left my-4 text-xl font-normal font-mono">
                            <p>Hình ảnh cà vẹt xe</p>
                        </div>

                        <Image.PreviewGroup>
                            <div className="w-full flex flex-row justify-center items-center">
                                <Image
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                    className="p-4"
                                />
                                <Image
                                    className="p-4"
                                    alt="example"
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                />
                            </div>
                        </Image.PreviewGroup>
                    </div>
                </div>
            )}
        </div>
    );
}
