import { ObjectId } from "mongoose";

interface VerifyDriver {
    identity_card: string;
    license_plates: string;
    driver_license_number: string;
    img_identity_card_front: string;
    img_identity_card_back: string;
    img_vehicle_registration: string;
    verify_date: Date;
}

export interface Driver {
    _id?: string;
    id_employee?: ObjectId;
    id_post_office?: ObjectId;
    name: string;
    password: string;
    re_password?: string;
    province: string;
    province_id: string;
    district: string;
    district_id: string;
    ward: string;
    ward_id: string;
    address_detail: string;
    phone: string;
    email: string;
    verify: boolean;
    verify_driver?: VerifyDriver;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    role: string;
}
