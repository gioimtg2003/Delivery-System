"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { ShipperStatusVerify } from "./Tag";
import { ShipperDataType } from "@/app/lib/type/Shipper";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { dateFormat } from "@/app/lib/util/dateFormat";
import { useShipper } from "@/app/lib/context/Shipper/Context";

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
            return ShipperStatusVerify(verify);
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "CreatedAt",
        key: "CreatedAt",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Hành động",
        dataIndex: "id",
        key: "Action",
        render: (id) => (
            <div className="w-full flex flex-row justify-around items-center">
                <FaRegEye className="cursor-pointer" />
                <Link href={`/shipper/edit/${id}`}>
                    <FaRegEdit className="cursor-pointer" />
                </Link>
            </div>
        ),
    },
];
export default function TableShipper(): React.ReactElement {
    const { state } = useShipper();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (state.shippers) {
            setLoading(false);
        }
    }, [state, setLoading]);
    const dataSource = useMemo((): ShipperDataType[] => {
        return (
            state?.shippers?.map((shipper) => ({
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
    }, [state]);
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 6 }}
            loading={loading}
        />
    );
}
