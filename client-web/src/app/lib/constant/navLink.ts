import { IconType } from "react-icons";
import { TbFileInvoice } from "react-icons/tb";
import { LuBarChart3 } from "react-icons/lu";
import { RiDashboardLine } from "react-icons/ri";

export type Link = {
    icon: IconType;
    name: string;
    url: string;
    selected?: boolean | undefined;
};

export const NavLink: Link[] = [
    {
        icon: RiDashboardLine,
        name: "Đặt đơn hàng",
        url: "/create-order",
    },
    {
        icon: TbFileInvoice,
        name: "Đơn hàng",
        url: "/order",
    },
    {
        icon: LuBarChart3,
        name: "Theo dõi",
        url: "/tracking",
    },
];
