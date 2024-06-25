"use client";
import { IWallet } from "@/app/lib/type/Wallet";
import { message, Table, TableProps } from "antd";
import { WalletAction, WalletStatus } from "../Tag";
import { useCallback, useMemo } from "react";
import { convertIso, dateFormat } from "@/app/lib/util/dateFormat";
import ViewImage from "./ViewImage";
import LoadingComponent from "../Loading";
import { TbListDetails } from "react-icons/tb";
import PopUpConfirm from "../popupConfirm/PopUpConfirm";
import { axiosInstance } from "@/app/lib/util/axios";
import { useWallet } from "@/app/lib/context/Wallet/Context";
import { NumberToPrice } from "@/app/lib/util/numberToPrice";

const columns: TableProps<IWallet>["columns"] = [
    {
        title: "Tên",
        dataIndex: "NameShipper",
        key: "NameShipper",
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
        title: "Hình ảnh",
        dataIndex: "ImgUrl",
        key: "ImgUrl",
        align: "center",
        render: (ImgUrl) => <ViewImage image={ImgUrl} />,
    },
    {
        title: "Trạng thái",
        dataIndex: "Status",
        key: "Status",
        align: "center",
        render: (status) => WalletStatus(status),
    },
];

const TableWallet = (): React.ReactElement => {
    const { state, reload, reloadHistoryWallet } = useWallet();
    const handle = useCallback(
        async (id: number, status: "accept" | "reject") => {
            try {
                let update = await axiosInstance().put(
                    `/admin/shipper/wallet`,
                    {
                        id,
                        status,
                    }
                );
                if (update.data.status === "success") {
                    message.success("Cập nhật thành công");
                    reload();
                    reloadHistoryWallet();
                }
            } catch (err) {
                console.log(err);
                message.error("Có lỗi xảy ra");
            }
        },
        [reload, reloadHistoryWallet]
    );
    const actionColumn = useMemo((): TableProps<IWallet>["columns"] => {
        return [
            {
                title: "Hành động",
                dataIndex: "id",
                key: "Action",
                align: "center",
                render: (id) => (
                    <div className="w-full flex flex-row justify-center items-center">
                        <PopUpConfirm
                            message="Chấp nhận yêu cầu này?"
                            title="Thao tác"
                            cancelText="Không"
                            confirmText="Có"
                            height="150px"
                            onConfirm={() => handle(id, "accept")}
                            onClose={() => handle(id, "reject")}
                        >
                            <TbListDetails
                                className="cursor-pointer"
                                size={20}
                            />
                        </PopUpConfirm>
                    </div>
                ),
            },
        ];
    }, [handle]);
    return actionColumn ? (
        <Table
            columns={columns.concat(actionColumn)}
            dataSource={state.wallet}
            pagination={{ pageSize: 10 }}
            rowKey="id"
        />
    ) : (
        <LoadingComponent />
    );
};
export default TableWallet;
