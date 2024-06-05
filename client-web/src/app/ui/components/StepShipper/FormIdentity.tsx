import { getServerSideProps } from "@/app/lib/constant/config";
import IMAGE from "@/app/lib/constant/img";
import { useShipper } from "@/app/lib/context/Shipper/Context";
import { ITransportType } from "@/app/lib/type/TransportType";
import { axiosInstance } from "@/app/lib/util/axios";
import { UploadOutlined } from "@ant-design/icons";
import { Card, Form, message, Radio, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

interface ISuccess {
    identity?: boolean;
    driveLicense?: boolean;
    vehicleRegistration?: boolean;
}
interface IImgUrl {
    ImgDriveLicense?: string[];
    ImgIdentityCard?: string[];
    ImgVehicleRegistrationCert?: string[];
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
    const [form] = Form.useForm();
    const [transportType, setTransportType] = useState<ITransportType[] | null>(
        null
    );
    const [imgUrl, setImgUrl] = useState<IImgUrl>({});
    const { reload } = useShipper();
    const [listImgIdentity, setListImgIdentity] = useState<UploadFile[]>([]);
    const [listImgDriveLicense, setListImgDriveLicense] = useState<
        UploadFile[]
    >([]);
    const [listImgVehicleRegistration, setListImgVehicleRegistration] =
        useState<UploadFile[]>([]);

    const onComplete = useCallback(
        (values: any) => {
            console.log(values);
            console.log(listImgIdentity);
            if (
                success.identity &&
                success.driveLicense &&
                success.vehicleRegistration &&
                listImgIdentity.length == 2 &&
                listImgDriveLicense.length == 2 &&
                listImgVehicleRegistration.length == 2 &&
                id &&
                imgUrl.ImgDriveLicense &&
                imgUrl.ImgIdentityCard &&
                imgUrl.ImgVehicleRegistrationCert
            ) {
                axiosInstance()
                    .post("/admin/shipper/identity", {
                        idShipper: id,
                        idTransportType: values.idTransportType,
                        ImgDriveLicenseBefore: imgUrl.ImgDriveLicense[0],
                        ImgDriveLicenseAfter: imgUrl.ImgDriveLicense[1],
                        ImgIdentityCardAfter: imgUrl.ImgIdentityCard[1],
                        ImgIdentityCardBefore: imgUrl.ImgIdentityCard[0],
                        ImgVehicleRegistrationCertBefore:
                            imgUrl.ImgVehicleRegistrationCert[0],
                        ImgVehicleRegistrationCertAfter:
                            imgUrl.ImgVehicleRegistrationCert[1],
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            message.success("Cập nhật thông tin thành công");
                            onClose();
                            reload();
                        } else {
                            message.warning("Cập nhật thông tin thất bại");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error("Cập nhật thông tin bị lỗi");
                    });
            } else {
                message.warning("Vui lòng tải lên đủ hình ảnh");
            }
        },
        [
            success,
            onClose,
            listImgIdentity,
            listImgDriveLicense,
            listImgVehicleRegistration,
            id,
        ]
    );

    useEffect(() => {
        (async () => {
            axiosInstance()
                .get("/transport-type")
                .then((res: AxiosResponse<any, any>) => {
                    if (res.data.code == 200) {
                        setTransportType(res.data.data);
                    }
                });
        })();
    }, []);

    return (
        <div className="w-full flex flex-col justify-start items-center max-h-[550px] overflow-auto">
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
                                let { url, key } = data.data;
                                let putRes = await axios.put(url, file, {
                                    headers: {
                                        "Content-Type": type,
                                    },
                                });

                                if (putRes) {
                                    onProgress?.({ percent: 99 });
                                    onSuccess?.("OK"); // Add null check before invoking onSuccess
                                    setSuccess({ ...success, identity: true });
                                    setImgUrl({
                                        ...imgUrl,
                                        ImgIdentityCard: [
                                            ...(imgUrl?.ImgIdentityCard || []),
                                            key,
                                        ],
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
                                    let { url, key } = data.data;
                                    let putRes = await axios.put(url, file, {
                                        headers: {
                                            "Content-Type": type,
                                        },
                                    });

                                    if (putRes) {
                                        onProgress?.({ percent: 99 });
                                        onSuccess?.("OK");
                                        setSuccess({
                                            ...success,
                                            driveLicense: true,
                                        });
                                        setImgUrl({
                                            ...imgUrl,
                                            ImgDriveLicense: [
                                                ...(imgUrl?.ImgDriveLicense ||
                                                    []),
                                                key,
                                            ],
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
                                    let { url, key } = data.data;
                                    let putRes = await axios.put(url, file, {
                                        headers: {
                                            "Content-Type": type,
                                        },
                                    });

                                    if (putRes) {
                                        onProgress?.({ percent: 99 });
                                        onSuccess?.("OK");
                                        setSuccess({
                                            ...success,
                                            vehicleRegistration: true,
                                        });

                                        setImgUrl({
                                            ...imgUrl,
                                            ImgVehicleRegistrationCert: [
                                                ...(imgUrl?.ImgVehicleRegistrationCert ||
                                                    []),
                                                key,
                                            ],
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
            <Form onFinish={onComplete} form={form} name="form-identity">
                <div className="w-full text-left my-4 text-xl font-normal font-mono">
                    <p>Phương tiện vận chuyển</p>
                </div>
                <Form.Item
                    name="idTransportType"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn phương tiện vận chuyển",
                        },
                    ]}
                >
                    <Radio.Group
                        name="radiogroup"
                        className="flex w-full justify-around"
                    >
                        {transportType?.map((item) => (
                            <div
                                key={item.id}
                                className="w-44 text-slate-500 p-2"
                            >
                                <Card
                                    title={
                                        <Radio
                                            value={item.id}
                                            className="text-wrap"
                                        >
                                            {item.Name}
                                        </Radio>
                                    }
                                    bordered={false}
                                    className="w-full"
                                >
                                    <Image
                                        src={`${getServerSideProps().props.API_URI}/images/${item.ImgUrl}`}
                                        alt={item.Name}
                                        width={64}
                                        height={64}
                                    />
                                </Card>
                            </div>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="mt-8 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 border-2 border-blue-500 transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    >
                        Cập nhật thông tin
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
}
