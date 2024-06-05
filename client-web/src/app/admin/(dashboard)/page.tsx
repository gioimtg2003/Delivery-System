"use client";

import { Form, Upload, UploadFile } from "antd";
import { useState } from "react";

export default function AdminPage(): React.ReactElement {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Here you can manage your website.</p>
            <Form onFinish={console.log} name="file">
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Please upload a file",
                        },
                    ]}
                >
                    <Upload
                        accept="image/*"
                        fileList={fileList}
                        listType="picture-card"
                        onChange={(e) => {
                            console.log(e.fileList);
                            setFileList(e.fileList);
                        }}
                        progress={{
                            strokeColor: {
                                "0%": "#108ee9",
                                "100%": "#87d068",
                            },
                            strokeWidth: 5,
                            format: (percent) => `${percent}%`,
                        }}
                    >
                        upload
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <button type="submit">Submit</button>
                </Form.Item>
            </Form>
        </div>
    );
}
