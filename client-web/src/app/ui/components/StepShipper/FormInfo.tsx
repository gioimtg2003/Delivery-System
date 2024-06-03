"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, message, Input, Select } from "antd";
import { IAddress } from "@/app/lib/type/Address";
import { Axios, axiosInstance } from "@/app/lib/util/axios";
import { VscListSelection } from "react-icons/vsc";
import { IShipper } from "@/app/lib/type/Shipper";
const axios = new Axios().getInstance();

export function FormInfo({
    next,
    setIdUser,
}: {
    readonly next: () => void;
    readonly setIdUser: (id: string) => void;
}): React.ReactElement {
    const [provinces, setProvinces] = useState<IAddress[]>([]);
    const [districts, setDistricts] = useState<IAddress[]>([]);
    const [wards, setWards] = useState<IAddress[]>([]);
    const [hamlet, setHamlet] = useState<IAddress[]>([]);
    const [form] = Form.useForm<IShipper>();

    const optionProvince = useMemo(
        () =>
            provinces.map((province, index) => ({
                label: province.name,
                value: String(province.id),
            })),
        [provinces]
    );

    const optionDistrict = useMemo(
        () =>
            districts.map((district, index) => ({
                label: district.name,
                value: String(district.id),
            })),
        [districts]
    );

    const optionWard = useMemo(
        () =>
            wards.map((ward, index) => ({
                label: ward.name,
                value: String(ward.id),
            })),
        [wards]
    );

    const optionHamlet = useMemo(
        () =>
            hamlet.map((hamlet, index) => ({
                label: hamlet.name,
                value: String(hamlet.id),
            })),
        [hamlet]
    );

    const filterOption = useCallback(
        (input: string, option?: { label: string; value: string }) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
        []
    );
    useEffect(() => {
        console.log("FormInfo");
    }, []);

    const createShipper = useCallback((data: IShipper) => {
        let Province = provinces.find(
            (province) => province.id === Number(data.Province_id)
        );
        let District = districts.find(
            (district) => district.id === Number(data.District_id)
        );
        let Ward = wards.find((ward) => ward.id === Number(data.Ward_id));
        let Hamlet = hamlet.find(
            (hamlet) => hamlet.id === Number(data.Hamlet_id)
        );
        const payload = {
            ...data,
            Province: Province?.name,
            District: District?.name,
            Ward: Ward?.name,
            Hamlet: Hamlet?.name,
            DetailsAddress: data.DetailsAddress ?? "",
        };
        delete payload.Province_id;
        delete payload.District_id;
        delete payload.Ward_id;
        delete payload.Hamlet_id;

        axiosInstance()
            .post("/admin/info-shipper", payload)
            .then((res) => {
                if (res.data.status === "success") {
                    setIdUser(res.data.data.id);
                    message.success("Tạo tài xế thành công");
                    form.resetFields();
                    next();
                } else {
                    message.error("Tạo tài xế thất bại");
                }
            })
            .catch((error) => {
                message.error("Tạo tài xế thất bại");
            });
    }, []);

    return (
        <Form
            form={form}
            name="step_shipper"
            onFinish={createShipper}
            className="items-center mt-5"
            onValuesChange={(changedValues, allValues) => {
                console.table(changedValues);
                console.table(allValues);
            }}
        >
            <p className="text-center mb-4 text-lg font-medium">
                Thông tin tài xế
            </p>
            <Form.Item
                name="Name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên!",
                    },
                ]}
                className="px-2"
            >
                <Input placeholder="Nhập tên" className="h-11" />
            </Form.Item>
            <div className="flex flex-row justify-center items-center">
                <Form.Item
                    name="Email"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập địa chỉ Email!",
                        },
                        {
                            type: "email",
                            message: "Địa chỉ Email không hợp lệ!",
                        },
                    ]}
                    className="px-2 w-1/2"
                >
                    <Input placeholder="Nhập địa chỉ Email" className="h-11" />
                </Form.Item>
                <Form.Item
                    name="Phone"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                            pattern: /^\d{10}$/,
                            message: "Số điện thoại không hợp lệ!",
                        },
                    ]}
                    className="px-2 w-1/2"
                >
                    <Input placeholder="Nhập số điện thoại" className="h-11" />
                </Form.Item>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center w-full">
                    <Form.Item
                        name="Province_id"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn Tỉnh/Thành phố",
                            },
                        ]}
                        className="w-1/2 px-2 mb-3"
                    >
                        <Select
                            showSearch
                            placeholder="Chọn tỉnh / thành phố"
                            optionFilterProp="children"
                            notFoundContent="Không tìm thấy tên tỉnh phù hợp"
                            filterOption={filterOption}
                            options={optionProvince}
                            onChange={(value) => {
                                form.setFieldsValue({
                                    District: undefined,
                                    Ward: undefined,
                                    Hamlet: undefined,
                                });
                                setDistricts([]);
                                setWards([]);
                                setHamlet([]);
                            }}
                            suffixIcon={
                                <VscListSelection className="text-gray-700" />
                            }
                            onDropdownVisibleChange={(open) => {
                                console.log(open);
                                console.log(provinces.length);
                                if (open && provinces.length === 0) {
                                    axios.get(`/address?pid=`).then((res) => {
                                        setProvinces(res.data.data);
                                    });
                                }
                            }}
                            className="h-11 rounded-md font-medium text-gray-600"
                        />
                    </Form.Item>
                    <Form.Item
                        name="District_id"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn Quận/Huyện",
                            },
                        ]}
                        className="w-1/2 px-2 mb-3"
                    >
                        <Select
                            showSearch
                            placeholder="Chọn Quận / Huyện"
                            optionFilterProp="children"
                            notFoundContent="Không tìm thấy tên quận/huyện phù hợp"
                            filterOption={filterOption}
                            options={optionDistrict}
                            onChange={(value) => {
                                form.setFieldsValue({
                                    Ward: undefined,
                                    Hamlet: undefined,
                                });
                                setWards([]);
                                setHamlet([]);
                            }}
                            onDropdownVisibleChange={(open) => {
                                if (open && form.getFieldValue("Province_id")) {
                                    axios
                                        .get(
                                            `/address?pid=${form.getFieldValue("Province_id")}`
                                        )
                                        .then((res) => {
                                            setDistricts(res.data.data);
                                        });
                                }
                            }}
                            suffixIcon={
                                <VscListSelection className="text-gray-700" />
                            }
                            className="h-11 rounded-md font-medium text-gray-600"
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-row justify-center items-center w-full">
                    <Form.Item
                        name="Ward_id"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn Phường/Xã",
                            },
                        ]}
                        className="w-1/2 px-2"
                    >
                        <Select
                            showSearch
                            placeholder="Chọn Phường / Xã"
                            optionFilterProp="children"
                            notFoundContent="Không tìm thấy địa chỉ phù hợp"
                            filterOption={filterOption}
                            options={optionWard}
                            onChange={(value) => {
                                form.setFieldsValue({
                                    Hamlet: undefined,
                                });
                                setHamlet([]);
                            }}
                            suffixIcon={
                                <VscListSelection className="text-gray-700" />
                            }
                            onDropdownVisibleChange={(open) => {
                                if (open && form.getFieldValue("District_id")) {
                                    axios
                                        .get(
                                            `/address?pid=${form.getFieldValue("District_id")}`
                                        )
                                        .then((res) => {
                                            setWards(res.data.data);
                                        });
                                }
                            }}
                            className="h-11 rounded-md font-medium text-gray-600"
                        />
                    </Form.Item>
                    <Form.Item
                        name="Hamlet_id"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn Đường/Ấp/Khu",
                            },
                        ]}
                        className="w-1/2 px-2"
                    >
                        <Select
                            showSearch
                            placeholder="Chọn Đường / Ấp / Khu"
                            optionFilterProp="children"
                            notFoundContent="Không tìm thấy địa chỉ phù hợp"
                            filterOption={filterOption}
                            options={optionHamlet}
                            suffixIcon={
                                <VscListSelection className="text-gray-700" />
                            }
                            onDropdownVisibleChange={(open) => {
                                if (open && form.getFieldValue("Ward_id")) {
                                    axios
                                        .get(
                                            `/address?pid=${form.getFieldValue("Ward_id")}`
                                        )
                                        .then((res) => {
                                            setHamlet(res.data.data);
                                        });
                                }
                            }}
                            className="h-11 rounded-md font-medium text-gray-600"
                        />
                    </Form.Item>
                </div>
                <Form.Item name="DetailsAddress" className="w-full px-2">
                    <Input
                        type="text"
                        placeholder="Địa chỉ cụ thể cụ thể"
                        className="w-full h-11 px-2 rounded-md font-medium text-gray-600"
                    />
                </Form.Item>
            </div>
            <div className="mt-8">
                <Form.Item>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 border-2 border-blue-500 transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    >
                        Tạo mới
                    </button>
                </Form.Item>
            </div>
        </Form>
    );
}
