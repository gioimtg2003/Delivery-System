import { ObjectId } from "mongoose";

type status = "Đóng cửa" | "Đang hoạt động";

export interface PostOffice {
    _id?: string;
    name: string;
    province: string;
    district: string;
    ward: string;
    address_detail: string;
    lat: number;
    lng: number;
    employee: [
        {
            id_employee: ObjectId;
        }
    ];
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    status: status;
}
