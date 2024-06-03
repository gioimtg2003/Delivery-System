import IMAGE from "@/app/lib/constant/img";
import { axiosInstance } from "@/app/lib/util/axios";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import React, { useCallback, useState } from "react";

interface ISuccess {
    identity?: boolean;
    driveLicense?: boolean;
    vehicleRegistration?: boolean;
}

export default function FormIdentity({
    id,
    onClose,
}: {
    readonly id?: string;
    readonly onClose: () => void;
}): React.ReactElement {
    const [success, setSuccess] = useState<ISuccess>({
        identity: false,
        driveLicense: false,
        vehicleRegistration: false,
    });

    const [listImgIdentity, setListImgIdentity] = useState<UploadFile[]>([]);
    const [listImgDriveLicense, setListImgDriveLicense] = useState<
        UploadFile[]
    >([]);
    const [listImgVehicleRegistration, setListImgVehicleRegistration] =
        useState<UploadFile[]>([]);

    const onComplete = useCallback(() => {
        if (
            success.identity &&
            success.driveLicense &&
            success.vehicleRegistration &&
            listImgIdentity.length == 2 &&
            listImgDriveLicense.length == 2 &&
            listImgVehicleRegistration.length == 2
        ) {
            message.success("Cập nhật thông tin thành công");
            onClose();
        } else {
            message.warning("Vui lòng tải lên đủ hình ảnh");
        }
    }, [
        success,
        onClose,
        listImgIdentity,
        listImgDriveLicense,
        listImgVehicleRegistration,
    ]);

    return (
        <div className="w-full  flex flex-col justify-start items-center max-h-96 overflow-auto">
            <div className="w-full text-left my-4 text-xl font-normal font-mono">
                <p>Hình ảnh CCCD</p>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                <Upload
                    accept="image/*"
                    maxCount={2}
                    listType="picture-card"
                    fileList={listImgIdentity}
                    onChange={(e) => {
                        console.log(e.fileList);
                        setListImgIdentity(e.fileList);
                    }}
                    progress={{
                        strokeColor: {
                            "0%": "#108ee9",
                            "100%": "#87d068",
                        },
                        strokeWidth: 5,
                        format: (percent) => `${percent}%`,
                    }}
                    onRemove={(file) => {
                        console.log(file);
                    }}
                    customRequest={async ({
                        file,
                        onError,
                        onProgress,
                        onSuccess,
                    }) => {
                        try {
                            const { name: file_name, type } = file as RcFile;
                            const { data } = await axiosInstance().post(
                                "/media/sign-url",
                                {
                                    fileName: file_name,
                                    typeImg: IMAGE.IDENTITY,
                                    contentType: type,
                                    id: id ?? "",
                                }
                            );
                            if (data.code == 200) {
                                onProgress?.({ percent: 50 });
                                let { url } = data.data;
                                let putRes = await axios.put(url, file, {
                                    headers: {
                                        "Content-Type": type,
                                        "Content-Length": new Blob([file]).size,
                                    },
                                });

                                if (putRes) {
                                    onProgress?.({ percent: 99 });
                                    onSuccess?.("OK"); // Add null check before invoking onSuccess
                                    setSuccess({ ...success, identity: true });
                                } else {
                                    alert("Upload failed");
                                    onError?.({
                                        name: "Upload Error",
                                        message: "Error",
                                    }); // Add null check before invoking onError
                                }
                            }
                        } catch (error) {
                            console.error(error);
                            alert("Upload failed");
                        }
                    }}
                >
                    <div className="w-full flex flex-row justify-center items-center">
                        <UploadOutlined className="pr-2" />
                        <p>Upload</p>
                    </div>
                </Upload>
            </div>
            <div className="w-full text-left my-4 text-xl font-normal font-mono">
                <p>Hình ảnh GPLX</p>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                <div className="w-full flex flex-row  justify-center items-center p-2 ">
                    <Upload
                        accept="image/*"
                        maxCount={2}
                        listType="picture-card"
                        fileList={listImgDriveLicense}
                        onChange={(e) => {
                            console.log(e.fileList);
                            setListImgDriveLicense(e.fileList);
                        }}
                        progress={{
                            strokeColor: {
                                "0%": "#108ee9",
                                "100%": "#87d068",
                            },
                            strokeWidth: 5,
                            format: (percent) => `${percent}%`,
                        }}
                        onRemove={(file) => {
                            console.log(file);
                        }}
                        customRequest={async ({
                            file,
                            onError,
                            onProgress,
                            onSuccess,
                        }) => {
                            try {
                                const { name: file_name, type } =
                                    file as RcFile;
                                const { data } = await axiosInstance().post(
                                    "/media/sign-url",
                                    {
                                        fileName: file_name,
                                        typeImg: IMAGE.DRIVE_LICENSE,
                                        contentType: type,
                                        id: id ?? "",
                                    }
                                );
                                if (data.code == 200) {
                                    onProgress?.({ percent: 50 });
                                    let { url } = data.data;
                                    let putRes = await axios.put(url, file, {
                                        headers: {
                                            "Content-Type": type,
                                            "Content-Length": new Blob([file])
                                                .size,
                                        },
                                    });

                                    if (putRes) {
                                        onProgress?.({ percent: 99 });
                                        onSuccess?.("OK");
                                        setSuccess({
                                            ...success,
                                            driveLicense: true,
                                        });
                                    } else {
                                        alert("Upload failed");
                                        onError?.({
                                            name: "Upload Error",
                                            message: "Error",
                                        }); // Add null check before invoking onError
                                    }
                                }
                            } catch (error) {
                                console.error(error);
                                alert("Upload failed");
                            }
                        }}
                    >
                        <div className="w-full flex flex-row justify-center items-center">
                            <UploadOutlined className="pr-2" />
                            <p>Upload</p>
                        </div>
                    </Upload>
                </div>
            </div>
            <div className="w-full text-left my-4 text-xl font-normal font-mono">
                <p>Hình ảnh Cà vẹt xe</p>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                <div className="w-full flex flex-row justify-center items-center p-2 ">
                    <Upload
                        accept="image/*"
                        maxCount={2}
                        listType="picture-card"
                        fileList={listImgVehicleRegistration}
                        onChange={(e) => {
                            console.log(e.fileList);
                            setListImgVehicleRegistration(e.fileList);
                        }}
                        progress={{
                            strokeColor: {
                                "0%": "#108ee9",
                                "100%": "#87d068",
                            },
                            strokeWidth: 5,
                            format: (percent) => `${percent}%`,
                        }}
                        onRemove={(file) => {
                            console.log(file);
                        }}
                        customRequest={async ({
                            file,
                            onError,
                            onProgress,
                            onSuccess,
                        }) => {
                            try {
                                const { name: file_name, type } =
                                    file as RcFile;
                                const { data } = await axiosInstance().post(
                                    "/media/sign-url",
                                    {
                                        fileName: file_name,
                                        typeImg: IMAGE.VEHICLE_REGISTRATION,
                                        contentType: type,
                                        id: id ?? "",
                                    }
                                );
                                if (data.code == 200) {
                                    onProgress?.({ percent: 80 });
                                    let { url } = data.data;
                                    let putRes = await axios.put(url, file, {
                                        headers: {
                                            "Content-Type": type,
                                            "Content-Length": new Blob([file])
                                                .size,
                                        },
                                    });

                                    if (putRes) {
                                        onProgress?.({ percent: 99 });
                                        onSuccess?.("OK");
                                        setSuccess({
                                            ...success,
                                            vehicleRegistration: true,
                                        });
                                    } else {
                                        alert("Upload failed");
                                        onError?.({
                                            name: "Upload Error",
                                            message: "Error",
                                        }); // Add null check before invoking onError
                                    }
                                }
                            } catch (error) {
                                console.error(error);
                                alert("Upload failed");
                            }
                        }}
                    >
                        <div className="w-full flex flex-row justify-center items-center">
                            <UploadOutlined className="pr-2" />
                            <p>Upload</p>
                        </div>
                    </Upload>
                </div>
            </div>
            <div className="mt-8">
                <button
                    onClick={onComplete}
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 border-2 border-blue-500 transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                >
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
}
