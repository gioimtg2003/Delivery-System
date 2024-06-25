"use client";
import { IWallet } from "@/app/lib/type/Wallet";
import { Table, TableProps } from "antd";
import { WalletAction, WalletStatus } from "../Tag";
import { convertIso } from "@/app/lib/util/dateFormat";
import { useWallet } from "@/app/lib/context/Wallet/Context";
import { NumberToPrice } from "@/app/lib/util/numberToPrice";

const columns: TableProps<IWallet>["columns"] = [
    {
        title: "Tên",
        dataIndex: "Name",
        key: "Name",
        render: (text) => <p className="font-medium">{text}</p>,
        align: "center",
    },

    {
        title: "Yêu cầu",
        dataIndex: "Action",
        key: "Action",
        align: "center",
        render: (_, { Action }) => (
            <div className="w-full flex flex-col justify-start items-center">
                {WalletAction(Action)}
            </div>
        ),
    },
    {
        title: "Số tiền",
        dataIndex: "Amount",
        key: "Amount",
        render: (text) => (
            <p className="font-medium">{NumberToPrice(Number(text))}</p>
        ),
        align: "center",
    },
    {
        title: "Thời gian yêu cầu",
        dataIndex: "TimeSubmit",
        key: "TimeSubmit",
        align: "center",
        render: (TimeSubmit) => {
            return <p>{convertIso(TimeSubmit)}</p>;
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "Status",
        key: "Status",
        align: "center",
        render: (status) => WalletStatus(status),
    },
    {
        title: "Thời gian xử lý",
        dataIndex: "TimeUpdate",
        key: "TimeUpdate",
        align: "center",
        render: (TimeUpdate) => convertIso(TimeUpdate),
    },
];

const TableHistoryWallet = (): React.ReactElement => {
    const { state } = useWallet();

    return (
        <Table
            columns={columns}
            dataSource={state.historyWallet}
            pagination={{ pageSize: 10 }}
            rowKey="id"
        />
    );
};
export default TableHistoryWallet;
