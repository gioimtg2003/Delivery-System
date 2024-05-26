import { IconType } from "react-icons";
import { TbFileInvoice } from "react-icons/tb";
import { LuBarChart3 } from "react-icons/lu";
import { RiDashboardLine, RiEBike2Line } from "react-icons/ri";

export type Link = {
    icon: IconType;
    name: string;
    url: string;
    selected?: boolean | undefined;
};

export const NavLink: Link[] = [
    {
        icon: RiDashboardLine,
        name: "Dashboard",
        url: "/admin",
    },
    {
        icon: RiEBike2Line,
        name: "Nhân viên giao hàng",
        url: "/admin/shipper",
    },
];
