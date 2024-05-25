import { msToDate } from "@/app/lib/util/dateFormat";
import { LocalDiningOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { Steps } from "antd";
import { useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { TiTick } from "react-icons/ti";
interface Props {
    OrderInfo: any;
    ShipperInfo?: any;
}
const ShipperOrder: React.FC<Props> = ({
    OrderInfo,
    ShipperInfo,
}): React.ReactNode => {
    useEffect(() => {
        console.log(OrderInfo?.Date?.OrderDate);
        console.log(ShipperInfo);
    }, [OrderInfo, ShipperInfo]);
    return (
        <div className="w-3/5 h-full flex flex-col items-start px-4">
            <Steps
                direction="vertical"
                items={[
                    {
                        title: "Đã Tạo đơn",
                        status: ShipperInfo ? "finish" : "process",
                        description: `Tạo đơn vào lúc: ${msToDate(OrderInfo?.Date?.OrderDate)}`,
                        icon: <IoCreateOutline />,
                    },
                    {
                        title:
                            OrderInfo?.Status === "Pending"
                                ? "Đang chờ nhận hàng"
                                : `Shipper đã nhận hàng ${msToDate(OrderInfo?.Date?.DeliveryDate)}`,
                        status:
                            OrderInfo?.Status === "Pending"
                                ? "wait"
                                : OrderInfo?.Status === "Completed"
                                  ? "finish"
                                  : OrderInfo?.Status === "Cancelled"
                                    ? "finish"
                                    : "process",
                        description: ShipperInfo
                            ? `Shipper: ${ShipperInfo.Name} đang giao gói hàng này`
                            : "",
                        icon: <MdDeliveryDining />,
                    },
                    {
                        title:
                            OrderInfo?.Status === "Completed"
                                ? "Đã giao hàng"
                                : OrderInfo?.Status === "Pending"
                                  ? "Chờ giao hàng"
                                  : OrderInfo?.Status === "Canceled"
                                    ? "Đã hủy hàng"
                                    : "Đang giao hàng",
                        status:
                            OrderInfo?.Status === "Completed"
                                ? "finish"
                                : "wait",
                        description:
                            OrderInfo?.Status === "Completed"
                                ? `Đã giao hàng vào lúc ${msToDate(OrderInfo?.Date?.CompletedDate)}`
                                : OrderInfo?.Status === "Canceled"
                                  ? `Đã hủy vào lúc ${msToDate(OrderInfo?.Date?.CancelDate)}`
                                  : "Đang được xử lý",
                        icon: <TiTick />,
                    },
                ]}
            />
        </div>
    );
};
export default ShipperOrder;
