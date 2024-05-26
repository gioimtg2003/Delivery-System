import { Dispatch } from "react";

export interface Identity {
    identityCard?: string;
    imgIdentityCardFront: string;
    imgIdentityCardBack: string;
    verifyDate?: Date;
}

export interface ShopUser {
    _id?: string;
    name: string;
    shop_name: string;
    email: string | undefined;
    phone: string;
    province?: string;
    province_id?: number;
    district?: string;
    district_id?: number;
    ward?: string;
    ward_id?: number;
    street?: string;
    street_id?: number;
    address_detail?: string;
    lat?: number;
    lng?: number;
    api_key?: string;
    check_verify_user: boolean;
    user_identity?: Identity;
    credentials_id?: string;
}
export interface AuthState {
    isAuthenticated?: boolean;
    user: ShopUser | undefined;
    isLoading?: boolean;
}

export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    INITIALIZE = "INITIALIZE",
    RELOAD = "RELOAD",
}

export interface AuthAction {
    type: AuthActionType;
    payload?: AuthState;
}

export interface AuthContextType extends AuthState {
    dispatch: Dispatch<AuthAction>;
}
