import { ObjectId } from "mongoose";

interface VerifyAccount {
    code: number;
    uri: string;
    expired: number;
}

interface Identity {
    identityCard: string;
    imgIdentityCardFront: string;
    imgIdentityCardBack: string;
    verifyDate: Date;
}
type CredentialsType = "password" | "facebook" | "google";

export interface Customer {
    _id?: string;
    name: string;
    shop_name: string;
    email: string;
    password: string;
    re_password?: string;
    phone: string;
    province?: string;
    province_id?: string;
    region?: string;
    district?: string;
    district_id?: string;
    ward?: string;
    ward_id?: string;
    street_id?: string;
    street?: string;
    address_detail?: string;
    lat?: number;
    lng?: number;
    id_employee?: ObjectId;
    verify_account?: VerifyAccount;
    user_identity?: Identity;
    check_verify_user: boolean;
    check_verify_account: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    role: string;
    api_key?: string;
    credentials_id?: string;
    credentials_type: CredentialsType;
    trigger_api_key: boolean;
    welcome?: boolean;
}
