"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

function Login(): JSX.Element {
  return (
    <>
      <div className="content flex flex-row pt-40 pb-3 justify-center items-center">
        <div className="w-7/12 lg:w-6/12 xl:w-5/12 text-center">
          <h1 className="text-wrap text-4xl text-sky-700 font-bold">Login</h1>
          <p className="pt-4 text-slate-500">
            Vui lòng nhập đầy đủ thông tin đăng nhập.
          </p>
        </div>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="max-w-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Ghi nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="sm:flex w-full items-center justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-32 mr-2"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
        <p className="text-center">
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-600">
            Đăng ký
          </Link>
        </p>
      </Form>
    </>
  );
}

export default Login;
