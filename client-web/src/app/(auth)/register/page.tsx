"use client";
import React, { useContext } from "react";
import { Button, Card, Checkbox, Form, Input, Radio, Select } from "antd";
import Link from "next/link";
import { Register } from "@/app/lib/service/user";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { useRouter } from "next/navigation";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );
    const { apiNotification, contextHolder } = useContext(NotificationContext);

    async function onFinish(values: any) {
        // console.log("Received values of form: ", values);
        try {
            let isRegister = await Register(values);
            if (isRegister.code === 200) {
                apiNotification.success({
                    message: "Register success!",
                    description:
                        "Vui lòng kiểm tra email để xác nhận tài khoản!",
                });
                form.resetFields();
            } else {
                apiNotification.error({
                    message: "Register failed!",
                    description: "Có lỗi xảy ra, vui lòng thử lại sau!",
                });
            }
        } catch (err: any) {
            apiNotification.error({
                message: "Register failed!",
                description: err?.message,
            });
        }
    }
    return (
        <>
            {contextHolder}
            <div className="flex w-full justify-center items-center md:ml-10">
                <h1 className="text-4xl mb-8 font-sans">Đăng ký</h1>
            </div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: "84",
                    scope: 1,
                }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="re_password"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The new password that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    name="shop_name"
                    label="Shop Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Shop Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error("Should accept agreement")
                                      ),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="#">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="h-10 md:h-8 w-full bg-blue-500"
                    >
                        Register
                    </Button>
                </Form.Item>
                <div className="flex w-full justify-center items-center">
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <Link href="/login" className="text-blue-600">
                            {" "}
                            Login
                        </Link>
                    </p>
                </div>
            </Form>
        </>
    );
};

export default RegisterPage;
