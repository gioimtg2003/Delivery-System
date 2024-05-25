"use client";

import { useAuth } from "@/app/lib/context/auth/authContext";
import { AuthActionType, ShopUser } from "@/app/lib/context/auth/type";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, FormInstance, Input, Select, Tooltip } from "antd";
import { FaRegAddressCard } from "react-icons/fa";
import { useProvince } from "@/app/lib/hook/useProvince";
import { VscListSelection } from "react-icons/vsc";
import { IDistrict } from "@/app/lib/type/District";
import { axiosInstance } from "@/app/lib/util/axios";
import { IWard } from "@/app/lib/type/Ward";
import LoadingComponent from "@/app/ui/components/Loading";
import { UpdateCustomer } from "@/app/lib/service/Customer/UpdateCustomer";
import { useMessageContext } from "./layout";
import { IAddress } from "@/app/lib/type/Address";

export default function SettingPage(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, dispatch } = useAuth();
    const [form_info] = Form.useForm<ShopUser | undefined>();
    const [form_stock] = Form.useForm<ShopUser | undefined>();
    const [openUpdateInfo, setOpenUpdateInfo] = useState<boolean>(false);
    const [openUpdateStock, setOpenUpdateStock] = useState<boolean>(false);
    const [openAddStock, setOpenAddStock] = useState<boolean>(true);
    const provinces = useProvince();
    const [districts, setDistricts] = useState<IAddress[]>([]);
    const [ward, setWard] = useState<IAddress[]>([]);
    const [street, setStreet] = useState<IAddress[]>([]);
    const message = useMessageContext();

    useEffect(() => {
        setIsLoading(true);
        if (user?.province && user?.district && user?.ward) {
            setOpenAddStock(false);
            onChangeProvince(user?.province_id as number);
            onChangeDistrict(user?.district_id as number);
            onChangeWard(user?.ward_id as number);
            form_stock.setFieldsValue({
                province_id: user?.province_id,
                district_id: user?.district_id,
                ward_id: user?.ward_id,
                street_id: user?.street_id,
                address_detail: user?.address_detail,
            });
            console.log(form_stock.getFieldsValue());
        } else {
            setOpenAddStock(true);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [form_info, form_stock, user]);

    const onChangeOrderStatus = useCallback((value: string) => {}, []);

    const onSearch = useCallback((value: string) => {}, []);

    const onChangeProvince = useCallback((value: number) => {
        axiosInstance()
            .get(`/address?pid=${value}`)
            .then((res) => {
                setDistricts(res.data.data);
            });
        form_stock.setFieldsValue({
            district: undefined,
            district_id: undefined,
            ward: undefined,
            ward_id: undefined,
            street: undefined,
            street_id: undefined,
            address_detail: undefined,
        });
    }, []);

    const onChangeDistrict = useCallback((value: number) => {
        axiosInstance()
            .get(`/address?pid=${value}`)
            .then((res) => {
                setWard(res.data.data);
            });
        form_stock.setFieldsValue({
            ward: undefined,
            ward_id: undefined,
            street_id: undefined,
            street: undefined,
            address_detail: undefined,
        });
    }, []);

    const onChangeWard = useCallback((value: number) => {
        axiosInstance()
            .get(`/address?pid=${value}`)
            .then((res) => {
                setStreet(res.data.data);
            });
        form_stock.setFieldsValue({
            street: undefined,
            street_id: undefined,
            address_detail: undefined,
        });
    }, []);

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
            ward.map((ward, index) => ({
                label: ward.name,
                value: String(ward.id),
            })),
        [ward]
    );

    const optionStreet = useMemo(
        () =>
            street.map((street, index) => ({
                label: street.name,
                value: String(street.id),
            })),
        [street]
    );

    const onFinishInfo = useCallback(async (values: ShopUser) => {
        delete values.email;
        UpdateCustomer<ShopUser>(values)
            .then((res) => {
                if (res) {
                    dispatch({ type: AuthActionType.RELOAD });
                    setOpenUpdateInfo(false);
                    message.success("Cập nhật thông tin thành công");
                }
            })
            .catch((err) => {
                console.log("Cập nhật thông tin thất bại");
                message.error("Cập nhật thông tin thất bại");
                dispatch({ type: AuthActionType.RELOAD });
                setOpenUpdateInfo(false);
            });
    }, []);

    const onFinishStock = useCallback(
        async (values: ShopUser) => {
            let province = provinces.find(
                (p) => p.id === Number(values.province_id)
            )?.name;
            let district = districts.find(
                (d) => d.id === Number(values.district_id)
            )?.name;
            let wards = ward.find((w) => w.id === Number(values.ward_id))?.name;
            let streetDt = street.find(
                (s) => s.id === Number(values.street_id)
            )?.name;
            let data = Object.assign(values, {
                province: province,
                district: district,
                ward: wards,
                street: streetDt,
            });

            UpdateCustomer<ShopUser>(data)
                .then((res) => {
                    if (res) {
                        dispatch({ type: AuthActionType.RELOAD });
                        setOpenUpdateStock(false);
                        message.success("Cập nhật kho hàng thành công");
                    }
                })
                .catch((err) => {
                    message.error("Cập nhật kho hàng thất bại");
                    dispatch({ type: AuthActionType.RELOAD });
                    setOpenUpdateStock(false);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [provinces, districts, street, ward]
    );
    return isLoading ? (
        <div className="w-full h-nav-setting flex flex-row justify-center items-center">
            <LoadingComponent />
        </div>
    ) : (
        <div className="pl-2">
            <div className="w-full py-2">
                <p className="text-2xl font-normal">Thông tin cá nhân</p>
            </div>
            <Form
                style={{ width: "100%", marginTop: 15 }}
                form={form_info as FormInstance<ShopUser>}
                onValuesChange={() => {
                    setOpenUpdateInfo(true);
                }}
                onFinish={onFinishInfo}
            >
                <div className="w-full flex flex-row justify-center items-center max-md:flex-col">
                    <div className="pr-8 w-1/2 flex-col justify-center items-center max-md:w-full">
                        <Form.Item label="Họ và tên" name="name">
                            <Input
                                className="text-[16px] text-black font-normal"
                                defaultValue={user?.name}
                            />
                        </Form.Item>
                        <Form.Item label="Tên shop" name="shop_name">
                            <Input
                                className="text-[16px] text-black font-normal"
                                defaultValue={user?.shop_name}
                            />
                        </Form.Item>
                    </div>

                    <div className="pr-8 w-1/2 flex-col justify-center items-center max-md:w-full">
                        <div className="pr-8 w-full flex-col justify-center items-center">
                            <Form.Item label="Phone" name="phone">
                                <Input
                                    className="text-[16px] text-black font-normal"
                                    defaultValue={user?.phone}
                                />
                            </Form.Item>
                            <Tooltip title="Bạn không thể chỉnh sửa Email">
                                <Form.Item label="Email " name="email">
                                    <Input
                                        className="text-[16px] text-black font-normal"
                                        disabled
                                        defaultValue={user?.email}
                                    />
                                </Form.Item>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="w-full text-end  border-b border-b-blue-300 pb-6 pr-14">
                    {openUpdateInfo && (
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-400 font-medium shadow-lg shadow-blue-200 border-2 border-blue-400 hover:bg-white text-white hover:text-blue-500 rounded-md hover:cursor-pointer hover:duration-300 hover:ease-linear hover:-translate-y-1"
                        >
                            Cập nhật thông tin
                        </button>
                    )}
                </div>
            </Form>

            <Form
                style={{ width: "100%", marginTop: 15 }}
                form={form_stock as FormInstance<ShopUser>}
                onValuesChange={() => {
                    setOpenUpdateStock(true);
                }}
                onFinish={onFinishStock}
            >
                <div className="w-full py-2 flex flex-row justify-between">
                    <Tooltip
                        title="Địa chỉ mà chúng tôi sẽ đến lấy hàng giúp bạn."
                        placement="rightTop"
                        color="#37A4E2"
                    >
                        <p className="text-2xl font-normal">Địa chỉ lấy hàng</p>
                    </Tooltip>

                    {openAddStock && (
                        <button className="flex flex-row justify-center items-center py-3 px-8 bg-white rounded-lg mr-8 text-blue-400 border-2 border-blue-400 shadow-md hover:shadow-lg hover:shadow-blue-300 shadow-blue-200 font-medium text-lg">
                            <span>Thêm mới địa chỉ</span>{" "}
                            <FaRegAddressCard
                                size={24}
                                style={{ marginLeft: 4 }}
                            />
                        </button>
                    )}
                </div>

                <div className="w-4/5 max-[1370px]:w-full flex flex-row justify-center items-center max-md:flex-col">
                    <div className="pr-8 w-1/2 flex-col justify-between items-center max-md:w-full">
                        <Form.Item
                            label="Tỉnh / Thành phố"
                            name="province_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn Tỉnh/Thành phố",
                                },
                            ]}
                            wrapperCol={{
                                span: 16,
                            }}
                            labelCol={{
                                span: 8,
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn tỉnh / thành phố"
                                optionFilterProp="children"
                                onChange={onChangeProvince}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={optionProvince}
                                notFoundContent="Không tìm thấy tên tỉnh phù hợp"
                                defaultValue={user?.province_id}
                                suffixIcon={
                                    <VscListSelection className="text-gray-700" />
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Quận / Huyện"
                            name="district_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn Quận/Huyện!",
                                },
                            ]}
                            wrapperCol={{
                                span: 16,
                            }}
                            labelCol={{
                                span: 8,
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn quận huyện"
                                optionFilterProp="children"
                                onChange={onChangeDistrict}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={optionDistrict}
                                notFoundContent="Không tìm thấy huyện nào"
                                defaultValue={user?.district_id}
                                suffixIcon={
                                    <VscListSelection className="text-gray-700" />
                                }
                            />
                        </Form.Item>
                    </div>

                    <div className="pr-8 w-1/2 flex-col justify-center items-center max-md:w-full">
                        <div className="pr-8 w-full flex-col justify-center items-center">
                            <Form.Item
                                label="Xã / Phường"
                                name="ward_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn Xã/Phường",
                                    },
                                ]}
                                wrapperCol={{
                                    span: 16,
                                }}
                                labelCol={{
                                    span: 8,
                                }}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn xã phường"
                                    optionFilterProp="children"
                                    onChange={onChangeWard}
                                    filterOption={filterOption}
                                    options={optionWard}
                                    notFoundContent="Không tìm thấy xã phường nào"
                                    suffixIcon={
                                        <VscListSelection className="text-gray-700" />
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Đường/Ấp/Khu"
                                name="street_id"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập chọn đường/ấp/khu",
                                    },
                                ]}
                                wrapperCol={{
                                    span: 16,
                                }}
                                labelCol={{
                                    span: 8,
                                }}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn Đường/Ấp/Khu/Thôn"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    options={optionStreet}
                                    notFoundContent="Không tìm thấy hịc!!"
                                    suffixIcon={
                                        <VscListSelection className="text-gray-700" />
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="w-2/4">
                    <Form.Item
                        label="Chi tiết địa chỉ"
                        name="address_detail"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập chi tiết địa chỉ",
                            },
                        ]}
                        wrapperCol={{
                            span: 16,
                        }}
                        labelCol={{
                            span: 8,
                        }}
                    >
                        <Input className="text-[16px] text-black font-normal" />
                    </Form.Item>
                </div>
                <div className="w-full text-end  border-b border-b-blue-300 pb-6 pr-14">
                    {openUpdateStock && (
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-400 font-medium shadow-lg shadow-blue-200 border-2 border-blue-400 hover:bg-white text-white hover:text-blue-500 rounded-md hover:cursor-pointer hover:duration-300 hover:ease-linear hover:-translate-y-1"
                        >
                            Cập nhật kho hàng
                        </button>
                    )}
                </div>
            </Form>
        </div>
    );
}
