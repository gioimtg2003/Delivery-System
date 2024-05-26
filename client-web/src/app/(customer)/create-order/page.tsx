"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    IoIosRemoveCircleOutline,
    IoMdCloseCircleOutline,
} from "react-icons/io";
import {
    Button,
    Checkbox,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    TimePicker,
    Tooltip,
} from "antd";
import Image from "next/image";
import { VscListSelection } from "react-icons/vsc";
import { IAddress } from "@/app/lib/type/Address";
import { axiosInstance } from "@/app/lib/util/axios";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CiBoxes, CiSquarePlus } from "react-icons/ci";
import { onNumericInputChange } from "@/app/lib/util/handleNumber";
import { TypeTransport } from "@/app/lib/constant/TypeTransport";
import {
    additional_service_type,
    AdditionalService,
} from "@/app/lib/constant/AdditionalService";
import styles from "./style.module.css";
interface IProduct {
    product_name: string;
    product_weight: number;
    product_quantity: number;
}

interface ICreateOrderPageProps {
    receiver_name: string;
    receiver_phone: string;
    receiver_province_id: string;
    receiver_district_id: string;
    receiver_ward_id: string;
    receiver_hamlet_id: string;
    receiver_address_details: string;
    is_fast: boolean;
    pickup_time: string;
    products: IProduct[];
    totalPrice: number;
    note: string;
    item_type: string[];
    additional_service: string[];
}
dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";
const dateNow = Date.now();
const date_2d = new Date(dateNow + 2 * 24 * 60 * 60 * 1000);
const nowDate = new Date(dateNow).getDate();
const nowMonth = new Date(dateNow).getMonth() + 1;
const nowYear = new Date(dateNow).getFullYear();
const _maxDate = new Date(date_2d).getDate();
const maxMonth = new Date(date_2d).getMonth() + 1;
const maxYear = new Date(date_2d).getFullYear();

const minDate = `${nowDate < 10 && `0${nowDate}`}-${nowMonth < 10 && `0${nowMonth}`}-${nowYear}`;
const maxDate = `${_maxDate < 10 && `0${_maxDate}`}-${maxMonth < 10 && `0${maxMonth}`}-${maxYear}`;

interface IAdditionalCostList {
    name: additional_service_type;
    cost: number;
}

interface IAdditionalServiceMethod {
    name: additional_service_type;
    method: "add" | "remove";
}
export default function CreateOrderPage(): React.ReactElement {
    const [form] = Form.useForm<ICreateOrderPageProps>();
    const [provinces, setProvinces] = useState<IAddress[]>([]);
    const [districts, setDistricts] = useState<IAddress[]>([]);
    const [wards, setWards] = useState<IAddress[]>([]);
    const [hamlet, setHamlet] = useState<IAddress[]>([]);
    const [isHiddenReceiver, setIsHiddenReceiver] = useState<boolean>(false);
    const [weightTotal, setWeightTotal] = useState<number>(0.1);
    const [costTotal, setCostTotal] = useState<number>(0);
    const [additionalCostList, setAdditionalCostList] = useState<
        IAdditionalCostList[]
    >([]);
    const [additionalServiceMethod, setAdditionalServiceMethod] =
        useState<IAdditionalServiceMethod | null>(null);
    const [deliveryCost, setDeliveryCost] = useState<number>(0);
    const [productPrice, setProductPrice] = useState<number>(0);
    const filterOption = useCallback(
        (input: string, option?: { label: string; value: string }) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
        []
    );

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

    // handle delivery cost and product price
    useEffect(() => {
        if (productPrice >= 0 || deliveryCost >= 0) {
            setCostTotal(productPrice + deliveryCost);
        }
    }, [productPrice, deliveryCost]);

    useEffect(() => {
        if (additionalServiceMethod) {
            if (
                additionalServiceMethod.name === "reinforce" &&
                additionalServiceMethod.method === "add"
            ) {
                setAdditionalCostList((prev) => [
                    ...prev,
                    {
                        name: "reinforce",
                        cost: costTotal * 0.08,
                    },
                ]);
            } else {
                setAdditionalCostList((prev) =>
                    prev.filter((cost) => cost.name !== "reinforce")
                );
            }
        }
    }, [additionalServiceMethod, costTotal]);

    return (
        <section className={`w-full bg-gray-100 p-4`}>
            <Form
                form={form}
                initialValues={{
                    receiverName: "",
                    receiverPhone: "",
                    receiver_province_id: undefined,
                    receiver_district_id: undefined,
                    receiver_ward_id: undefined,
                    receiver_hamlet_id: undefined,
                    address: "",
                    is_fast: false,
                    pickup_date: dayjs(minDate, dateFormat),
                    pickup_time: undefined,
                    products: [
                        {
                            product_name: "",
                            product_weight: 0.1,
                            product_quantity: 1,
                        },
                    ],
                    totalPrice: undefined,
                    note: undefined,
                    item_type: ["food"],
                }}
                className="w-full h-full  bg-white "
            >
                <div className="w-full h-full  bg-white rounded-lg shadow-md shadow-blue-200 flex flex-row max-md:flex-col justify-center items-start">
                    <div
                        className={`${isHiddenReceiver ? "w-full" : "w-7/12"} p-4 max-md:w-full h-full transition-with duration-500 ease-out`}
                    >
                        <div className="w-full h-full bg-white rounded-lg border-2 border-gray-100 px-2 py-4">
                            <p className="text-xl font-semibold text-gray-700 mb-4">
                                Chi tiết
                            </p>
                            <Form.List name="products">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(
                                            ({ key, name, ...restField }) => (
                                                <div
                                                    key={key}
                                                    className="flex flex-row items-center justify-center mb-8"
                                                >
                                                    {" "}
                                                    <div className="w-1/5 flex flex-row justify-center items-center max-md:hidden">
                                                        <div className="rounded-xl w-24 h-24 p-2 border-2 border-gray-200 flex flex-row items-center justify-center shadow-sm">
                                                            <Image
                                                                src={`/images/product_image.png`}
                                                                width={70}
                                                                height={70}
                                                                alt="Receiver"
                                                                className="rounded-full "
                                                                objectFit="cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-4/5 max-md:w-full flex flex-row justify-center items-center">
                                                        <div className="w-4/5 flex flex-col items-start justify-center">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[
                                                                    name,
                                                                    "product_name",
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            "Vui lòng nhập tên sản phẩm",
                                                                    },
                                                                ]}
                                                                className="w-full mb-2"
                                                            >
                                                                <Input
                                                                    placeholder="Tên sản phẩm"
                                                                    className="w-full h-11"
                                                                    prefix={
                                                                        <CiBoxes
                                                                            size={
                                                                                22
                                                                            }
                                                                        />
                                                                    }
                                                                />
                                                            </Form.Item>
                                                            <div className="w-full flex flex-row max-lg:flex-col justify-center items-center">
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[
                                                                        name,
                                                                        "product_weight",
                                                                    ]}
                                                                    rules={[
                                                                        {
                                                                            required:
                                                                                true,
                                                                            message:
                                                                                "Vui lòng nhập trọng lượng",
                                                                        },
                                                                    ]}
                                                                    className="w-full mb-0 px-1 h-11 max-md:mb-2 max-md:px-0"
                                                                >
                                                                    <InputNumber
                                                                        className=" flex flex-row justify-center items-center"
                                                                        min={
                                                                            0.1
                                                                        }
                                                                        max={
                                                                            999
                                                                        }
                                                                        step={
                                                                            0.1
                                                                        }
                                                                        addonAfter="kg"
                                                                        addonBefore="Trọng lượng"
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[
                                                                        name,
                                                                        "product_quantity",
                                                                    ]}
                                                                    rules={[
                                                                        {
                                                                            required:
                                                                                true,
                                                                            message:
                                                                                "Vui lòng nhập số lượng",
                                                                        },
                                                                    ]}
                                                                    className="w-full mb-0 px-1 h-11 max-md:px-0"
                                                                >
                                                                    <InputNumber
                                                                        className=" flex flex-row justify-center items-center"
                                                                        min={1}
                                                                        max={
                                                                            999
                                                                        }
                                                                        addonAfter="Đơn vị"
                                                                        addonBefore="Số lượng"
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                        <div className="w-1/5 flex justify-center items-center">
                                                            <IoIosRemoveCircleOutline
                                                                onClick={() =>
                                                                    remove(name)
                                                                }
                                                                className="cursor-pointer size-7 text-red-400 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        <Form.Item>
                                            <Button
                                                onClick={() => add()}
                                                className="w-full text-lg py-1 h-auto flex flex-row justify-center items-center text-blue-400"
                                                icon={<CiSquarePlus />}
                                                style={{
                                                    backgroundColor: "white",
                                                }}
                                            >
                                                Thêm sản phẩm
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <div className="grid grid-cols-4 gap-9 ">
                                <div className="col-span-1">
                                    <p className="text-lg font-normal text-gray-700">
                                        Tổng khối lượng:
                                    </p>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-lg font-semibold">
                                        {weightTotal} Kg
                                    </p>
                                </div>
                                <div className="col-span-1 self-center">
                                    <Tooltip
                                        title="Khi có sự cố Shippy sẽ bồi thường đúng giá trị đơn hàng của bạn"
                                        color="blue"
                                    >
                                        <p className="text-lg font-normal text-gray-700">
                                            Tổng giá trị đơn hàng:
                                        </p>
                                    </Tooltip>
                                </div>
                                <div className="col-span-3 self-center">
                                    <Form.Item
                                        name="totalPrice"
                                        className="mb-0 "
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập giá trị đơn hàng",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            placeholder="Nhập giá trị đơn hàng"
                                            formatter={(value) => {
                                                return `${onNumericInputChange(value)}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                );
                                            }}
                                            addonAfter="₫"
                                            className="w-3/6 h-10 p-0"
                                            size="large"
                                            onChange={(value) => {
                                                setProductPrice(
                                                    value as number
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-lg font-normal text-gray-700">
                                        Phí vận chuyển:
                                    </p>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-xl font-normal">
                                        {deliveryCost} ₫
                                    </p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-lg font-normal text-gray-700">
                                        Tổng chi phí:
                                    </p>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-xl font-normal">
                                        {costTotal
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}{" "}
                                        ₫
                                    </p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-lg font-normal text-gray-700">
                                        Ghi chú cho tài xế:
                                    </p>
                                </div>
                                <div className="col-span-3">
                                    <Form.Item name="note" className="w-full">
                                        <Input
                                            placeholder="Nhập ghi chú"
                                            className="w-full h-11"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-blue-200 mt-4"></div>

                            <p className="text-xl font-semibold text-gray-600 mb-4">
                                Loại hàng vận chuyển
                            </p>

                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#3b82f6",
                                    },
                                }}
                            >
                                <Form.Item
                                    name="item_type"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn loại hàng",
                                        },
                                    ]}
                                >
                                    <Checkbox.Group className="grid grid-cols-4 gap-6 px-10">
                                        {TypeTransport.map((type, index) => (
                                            <Checkbox
                                                key={index}
                                                value={type.value}
                                                className="col-span-2 max-sm:col-span-4 justify-items-center items-center "
                                            >
                                                {type.name}
                                            </Checkbox>
                                        ))}
                                        <Checkbox
                                            value="other"
                                            className="col-span-2 max-sm:col-span-4 justify-items-center items-center "
                                        >
                                            Khác
                                        </Checkbox>
                                    </Checkbox.Group>
                                </Form.Item>
                            </ConfigProvider>
                            <div className="w-full h-[1px] bg-blue-200 mt-4"></div>

                            <p className="text-xl font-semibold text-gray-600 mb-4">
                                Dịch vụ gia tăng
                            </p>
                            <Checkbox.Group
                                className="flex flex-col items-start justify-start ml-3"
                                onChange={(e) => {
                                    const value =
                                        e as additional_service_type[];
                                    console.log(value.includes("reinforce"));
                                    if (value.includes("reinforce")) {
                                        setAdditionalServiceMethod({
                                            name: "reinforce",
                                            method: "add",
                                        });
                                    } else {
                                        setAdditionalServiceMethod({
                                            name: "reinforce",
                                            method: "remove",
                                        });
                                    }
                                    if (value.includes("hand_delivery")) {
                                        setAdditionalServiceMethod({
                                            name: "hand_delivery",
                                            method: "add",
                                        });
                                    } else {
                                        setAdditionalServiceMethod({
                                            name: "hand_delivery",
                                            method: "remove",
                                        });
                                    }
                                }}
                            >
                                {AdditionalService.map((service, index) => (
                                    <Checkbox
                                        key={index}
                                        value={service.value}
                                        className={`text-xl mb-2 ${styles.checkbox_span} w-full `}
                                    >
                                        <span>{service.name}</span>
                                        <span className="text-gray-500 text-sm ml-2">
                                            ({service.description})
                                        </span>
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </div>
                    </div>
                    <div
                        className={` max-md:w-full p-4 h-full transition-with duration-500 ease-out ${isHiddenReceiver ? "w-0/12" : "w-5/12"}`}
                    >
                        <div className="w-full h-full bg-white rounded-lg border-2 border-gray-100 px-2 py-4">
                            <div
                                className={`w-full ${!isHiddenReceiver ? "flex flex-row" : "cursor-pointer"} justify-between items-center`}
                                onClick={() =>
                                    isHiddenReceiver &&
                                    setIsHiddenReceiver(false)
                                }
                            >
                                <p className="text-xl font-semibold text-gray-700 text-center">
                                    Người nhận
                                </p>
                                <IoMdCloseCircleOutline
                                    className={`size-7 cursor-pointer text-primary-1-color ${isHiddenReceiver ? "hidden" : ""} max-md:hidden`}
                                    onClick={() => setIsHiddenReceiver(true)}
                                />
                            </div>
                            <div
                                className={`${isHiddenReceiver && "hidden"} mt-4`}
                            >
                                <div className="flex flex-row items-center justify-center">
                                    <Image
                                        src={`/images/Receiver_Image.jpg`}
                                        width={90}
                                        height={90}
                                        alt="Receiver"
                                        className="rounded-full w-1/5"
                                        objectFit="cover"
                                    />
                                    <div className="w-4/5 px-6 flex flex-col justify-center">
                                        <Form.Item
                                            name="receiverName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập tên người nhận",
                                                },
                                            ]}
                                            tooltip="Vui lòng nhập tên người nhận"
                                        >
                                            <Input
                                                type="text"
                                                placeholder="Họ và tên"
                                                prefix={<FaRegUser size={20} />}
                                                className="w-full h-10 px-2 border-2 border-blue-100 rounded-lg font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="receiverPhone"
                                            rules={[
                                                {
                                                    pattern: new RegExp(
                                                        /^\d{10}$/
                                                    ),
                                                    message:
                                                        "Vui lòng nhập số điện thoại đúng định dạng",
                                                },
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập số điện thoại",
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="text"
                                                placeholder="0367093828"
                                                prefix={
                                                    <MdOutlinePhoneInTalk
                                                        size={20}
                                                    />
                                                }
                                                className="w-full h-10 px-2 border-2 border-blue-100 rounded-lg font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-blue-200 mt-4"></div>
                                <p className="mt-2 text-lg font-medium text-gray-600">
                                    Địa chỉ
                                </p>
                                <div className="mt-2 w-full flex flex-col justify-center items-center pt-6">
                                    <div className="flex flex-row justify-center items-center w-full">
                                        <Form.Item
                                            name="receiver_province_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn Tỉnh/Thành phố",
                                                },
                                            ]}
                                            className="w-1/2 border-none px-2 mb-3"
                                        >
                                            <Select
                                                showSearch
                                                variant="borderless"
                                                placeholder="Chọn tỉnh / thành phố"
                                                optionFilterProp="children"
                                                notFoundContent="Không tìm thấy tên tỉnh phù hợp"
                                                filterOption={filterOption}
                                                options={optionProvince}
                                                onChange={(value) => {
                                                    form.setFieldsValue({
                                                        receiver_district_id:
                                                            undefined,
                                                        receiver_ward_id:
                                                            undefined,
                                                        receiver_hamlet_id:
                                                            undefined,
                                                    });
                                                    setDistricts([]);
                                                    setWards([]);
                                                    setHamlet([]);
                                                }}
                                                suffixIcon={
                                                    <VscListSelection className="text-gray-700" />
                                                }
                                                onDropdownVisibleChange={(
                                                    open
                                                ) => {
                                                    if (
                                                        open &&
                                                        provinces.length === 0
                                                    ) {
                                                        axiosInstance()
                                                            .get(
                                                                `/address?pid=`
                                                            )
                                                            .then((res) => {
                                                                setProvinces(
                                                                    res.data
                                                                        .data
                                                                );
                                                            });
                                                    }
                                                }}
                                                className="h-11  border-2 border-blue-200 rounded-md font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="receiver_district_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn Tỉnh/Thành phố",
                                                },
                                            ]}
                                            className="w-1/2 border-none px-2 mb-3"
                                        >
                                            <Select
                                                showSearch
                                                variant="borderless"
                                                placeholder="Chọn Quận / Huyện"
                                                optionFilterProp="children"
                                                notFoundContent="Không tìm thấy tên quận/huyện phù hợp"
                                                filterOption={filterOption}
                                                options={optionDistrict}
                                                onChange={(value) => {
                                                    form.setFieldsValue({
                                                        receiver_ward_id:
                                                            undefined,
                                                        receiver_hamlet_id:
                                                            undefined,
                                                    });
                                                    setWards([]);
                                                    setHamlet([]);
                                                }}
                                                onDropdownVisibleChange={(
                                                    open
                                                ) => {
                                                    if (
                                                        open &&
                                                        form.getFieldValue(
                                                            "receiver_province_id"
                                                        )
                                                    ) {
                                                        axiosInstance()
                                                            .get(
                                                                `/address?pid=${form.getFieldValue("receiver_province_id")}`
                                                            )
                                                            .then((res) => {
                                                                setDistricts(
                                                                    res.data
                                                                        .data
                                                                );
                                                            });
                                                    }
                                                }}
                                                suffixIcon={
                                                    <VscListSelection className="text-gray-700" />
                                                }
                                                className="h-11  border-2 border-blue-200 rounded-md font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-row justify-center items-center w-full">
                                        <Form.Item
                                            name="receiver_ward_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn Phường/Xã",
                                                },
                                            ]}
                                            className="w-1/2 border-none px-2"
                                        >
                                            <Select
                                                showSearch
                                                variant="borderless"
                                                placeholder="Chọn Phường / Xã"
                                                optionFilterProp="children"
                                                notFoundContent="Không tìm thấy địa chỉ phù hợp"
                                                filterOption={filterOption}
                                                options={optionWard}
                                                onChange={(value) => {
                                                    form.setFieldsValue({
                                                        receiver_hamlet_id:
                                                            undefined,
                                                    });
                                                    setHamlet([]);
                                                }}
                                                suffixIcon={
                                                    <VscListSelection className="text-gray-700" />
                                                }
                                                onDropdownVisibleChange={(
                                                    open
                                                ) => {
                                                    if (
                                                        open &&
                                                        form.getFieldValue(
                                                            "receiver_district_id"
                                                        )
                                                    ) {
                                                        axiosInstance()
                                                            .get(
                                                                `/address?pid=${form.getFieldValue("receiver_district_id")}`
                                                            )
                                                            .then((res) => {
                                                                setWards(
                                                                    res.data
                                                                        .data
                                                                );
                                                            });
                                                    }
                                                }}
                                                className="h-11  border-2 border-blue-200 rounded-md font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="receiver_hamlet_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn Đường/Ấp/Khu",
                                                },
                                            ]}
                                            className="w-1/2 border-none px-2"
                                        >
                                            <Select
                                                showSearch
                                                variant="borderless"
                                                placeholder="Chọn Đường / Ấp / Khu"
                                                optionFilterProp="children"
                                                notFoundContent="Không tìm thấy địa chỉ phù hợp"
                                                filterOption={filterOption}
                                                options={optionHamlet}
                                                suffixIcon={
                                                    <VscListSelection className="text-gray-700" />
                                                }
                                                onDropdownVisibleChange={(
                                                    open
                                                ) => {
                                                    if (
                                                        open &&
                                                        form.getFieldValue(
                                                            "receiver_ward_id"
                                                        )
                                                    ) {
                                                        axiosInstance()
                                                            .get(
                                                                `/address?pid=${form.getFieldValue("receiver_ward_id")}`
                                                            )
                                                            .then((res) => {
                                                                setHamlet(
                                                                    res.data
                                                                        .data
                                                                );
                                                            });
                                                    }
                                                }}
                                                className="h-11  border-2 border-blue-200 rounded-md font-medium text-gray-600"
                                            />
                                        </Form.Item>
                                    </div>
                                    <Form.Item
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập địa chỉ",
                                            },
                                        ]}
                                        className="w-full border-none px-2"
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Địa chỉ cụ thể cụ thể"
                                            className="w-full h-11 px-2 border-2 border-blue-200 rounded-md font-medium text-gray-600"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full h-[1px] bg-blue-200 mt-4"></div>
                                <p className="mt-2 text-lg font-medium text-gray-600">
                                    Phương thức giao hàng
                                </p>

                                <Form.Item
                                    name="is_fast"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn phương thức giao hàng",
                                        },
                                    ]}
                                    className="w-full mt-2"
                                >
                                    <Radio.Group className="w-full flex flex-row justify-around items-center text-lg font-medium">
                                        <Radio value={true} className="">
                                            Nhanh 2h{" "}
                                            <span className="text-gray-500">
                                                (Áp dụng nội thành)
                                            </span>
                                        </Radio>
                                        <Radio value={false}>Bình thường</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <p className="mt-2 text-md font-normal text-gray-600">
                                    Thời gian lấy hàng
                                </p>
                                <div className="w-full flex flex-row justify-center items-center">
                                    <Form.Item
                                        name="pickup_date"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng chọn thời gian lấy hàng",
                                            },
                                        ]}
                                        className="w-1/2 mt-2 px-3"
                                    >
                                        <DatePicker
                                            placeholder="Chọn ngày"
                                            minDate={dayjs(minDate, dateFormat)}
                                            maxDate={dayjs(maxDate, dateFormat)}
                                            format={dateFormat}
                                            className="w-full h-11 px-2 border-2 border-blue-200 rounded-md font-medium text-gray-600 "
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="pickup_time"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng chọn thời gian lấy hàng",
                                            },
                                            {
                                                validator(
                                                    rule,
                                                    value,
                                                    callback
                                                ) {
                                                    if (
                                                        value.$H < 7 ||
                                                        value.$H >= 22
                                                    ) {
                                                        return Promise.reject(
                                                            "Thời gian lấy hàng từ 7h - 22h"
                                                        );
                                                    }

                                                    if (
                                                        value.$H <
                                                            new Date().getHours() ||
                                                        value.$m <
                                                            new Date().getMinutes()
                                                    )
                                                        return Promise.reject(
                                                            "Thời gian lấy hàng phải lớn hơn thời gian hiện tại"
                                                        );
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                        className="w-1/2 mt-2 px-3"
                                    >
                                        <TimePicker
                                            placeholder="Chọn giờ"
                                            format={timeFormat}
                                            className="w-full h-11 px-2 border-2 border-blue-200 rounded-md font-medium text-gray-600 "
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-blue-200 mt-4"></div>
                <div className="w-full flex flex-row justify-center items-center mt-4 pb-10">
                    <Button
                        htmlType="submit"
                        className="w-1/2 h-11 text-lg text-blue-400 border-2"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </Form>
        </section>
    );
}
