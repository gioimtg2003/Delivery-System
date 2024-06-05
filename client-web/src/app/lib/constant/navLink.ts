import { IconType } from "react-icons";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { RiDashboardLine, RiEBike2Line } from "react-icons/ri";
import { BsInboxes } from "react-icons/bs";

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
        name: "Thêm mới shipper",
        url: "/admin/shipper",
    },
    {
        icon: MdOutlineVerified,
        name: "Xác minh shipper",
        url: "/admin/verify",
    },
    {
        icon: IoWalletOutline,
        name: "Quản lý ví",
        url: "/admin/shipper",
    },
    {
        icon: BsInboxes,
        name: "Quản lý đơn hàng",
        url: "/admin/shipper",
    },
];
