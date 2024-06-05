import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    CarOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const ShipperStatus = (status: string): JSX.Element => {
    switch (status) {
        case "online":
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    ONLINE
                </Tag>
            );
        case "offline":
            return (
                <Tag icon={<ClockCircleOutlined />} color="default">
                    OFFLINE
                </Tag>
            );
        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color="default">
                    UNKNOWN
                </Tag>
            );
    }
};

export const ShipperStatusVerify = (status: number): JSX.Element => {
    switch (status) {
        case 1:
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    ĐÃ XÁC THỰC
                </Tag>
            );
        case 0:
            return (
                <Tag icon={<ClockCircleOutlined />} color="default">
                    CHƯA XÁC THỰC
                </Tag>
            );
        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color="default">
                    UNKNOWN
                </Tag>
            );
    }
};

export const OrderStatus = (status: string): JSX.Element => {
    switch (status) {
        case "Pending":
            return (
                <Tag icon={<SyncOutlined spin />} color="processing">
                    Đang xử lý
                </Tag>
            );
        case "Delivery":
            return (
                <Tag icon={<CarOutlined />} color="lime">
                    Đang vận chuyển
                </Tag>
            );
        case "Canceled":
            return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    Đã hủy
                </Tag>
            );
        case "Completed":
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Thành công
                </Tag>
            );
        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color="default">
                    Unknown
                </Tag>
            );
    }
};
