"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { WaitingVerify } from "./Tag";
import { IShipper, ShipperDataType } from "@/app/lib/type/Shipper";
import { message, Table, TableProps } from "antd";
import Link from "next/link";
import { dateFormat } from "@/app/lib/util/dateFormat";
import { axiosInstance } from "@/app/lib/util/axios";

const columns: TableProps<ShipperDataType>["columns"] = [
    {
        title: "Tên",
        dataIndex: "Name",
        key: "Name",
        render: (text) => <p className="font-medium">{text}</p>,
    },
    {
        title: "Liên hệ",
        dataIndex: "id",
        key: "id",
        render: (_, { Contact }) => (
            <div className="w-full flex flex-col justify-start items-center">
                <p className="font-medium">{Contact?.Phone}</p>
                <p>{Contact?.Email}</p>
            </div>
        ),
    },
    {
        title: "Địa chỉ",
        dataIndex: "Address",
        key: "Address",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Trạng thái",
        dataIndex: "Active",
        key: "Active",
        render: (verify) => {
            return WaitingVerify(verify);
        },
    },
    {
        title: "Ngày yêu cầu",
        dataIndex: "CreatedAt",
        key: "CreatedAt",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Chi tiết",
        dataIndex: "id",
        key: "Action",
        render: (id) => (
            <div className="w-full flex flex-row justify-center items-center">
                <Link href={`/admin/verify/${id}`}>
                    <FaRegEye className="cursor-pointer" />
                </Link>
            </div>
        ),
    },
];
export default function TableShipperVerify(): React.ReactElement {
    const [shippers, setShippers] = useState<IShipper[]>([]);
    useEffect(() => {
        axiosInstance()
            .get("/admin/shipper/verify")
            .then((res) => {
                if (res.data.status === "success") {
                    setShippers(res.data.data);
                } else {
                    message.error("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            })
            .catch((err) => {
                message.error("Có lỗi xảy ra, vui lòng thử lại sau");
            });
    }, []);
    const dataSource = useMemo((): ShipperDataType[] => {
        return (
            shippers?.map((shipper) => ({
                id: shipper.id,
                key: shipper.id,
                Name: shipper.Name,
                Contact: {
                    Phone: shipper.Phone,
                    Email: shipper.Email,
                },
                Address: `${shipper.DetailsAddress ? shipper.DetailsAddress + ", " : ""} ${shipper.Ward}, ${shipper.District}, ${shipper.Province}`,
                Active: shipper.Verify,
                CreatedAt: dateFormat(shipper.Created?.toString() ?? ""),
            })) ?? []
        );
    }, [shippers]);
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 7 }}
        />
    );
}
