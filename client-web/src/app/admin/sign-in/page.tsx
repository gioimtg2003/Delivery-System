"use client";
import { useNotification } from "@/app/lib/context/NotificationContext";
import { SignInAdmin } from "@/app/lib/service/auth";
import { Button, Flex, Form, Input } from "antd";
import Image from "next/image";
import React from "react";
interface ILogin {
    readonly Email: string;
    readonly Password: string;
}
export default function LoginPage(): React.ReactElement {
    const [form] = Form.useForm<ILogin>();
    const { apiNotification } = useNotification();
    const onFinish = async (values: ILogin) => {
        console.log("Received values of form: ", values);
        let login = await SignInAdmin(values, apiNotification);
        if (login) {
            window.location.href = "/admin";
        }
    };

    return (
        <div className="w-full h-screen flex flex-row justify-center items-center p-8 max-sm:p-4">
            <div className="w-3/6 max-sm:w-full max-md:w-4/6 flex flex-col justify-center items-center p-4 border-2 border-blue-100/50 shadow-sm shadow-blue-100 rounded-md">
                <Image
                    src="/images/LogoIntro.png"
                    alt="Shippy Logo"
                    width={100}
                    height={100}
                    objectFit="contain"
                />
                <p className="text-2xl text-center font-thin mt-8 text-gray-600 ">
                    Đăng Nhập Shippy
                </p>
                <p className="text-lg text-center font-thin mt-4 text-gray-500">
                    Đăng nhập để quản lý hệ thống Shippy
                </p>
                <Form
                    form={form}
                    className=" mt-10 w-1/2 max-lg:w-5/6 max-md:w-full"
                    onFinish={onFinish}
                >
                    <Form.Item<ILogin>
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Email!",
                            },
                            {
                                type: "email",
                                message: "Email không hợp lệ!",
                            },
                        ]}
                        className="mb-8"
                    >
                        <Input placeholder="Email Đăng Nhập" className="h-11" />
                    </Form.Item>
                    <Form.Item<ILogin>
                        name="Password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            className="h-11"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="center" align="center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full h-11 text-lg text-white border-2 bg-blue-500"
                            >
                                Đăng Nhập
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
