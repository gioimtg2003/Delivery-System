import { ObjectId } from "mongoose";

export type payer = "shop" | "customer";
export type method_pickup = "on_site" | "on_post_office";
export type status_order =
    | "pending_pickup"
    | "picked_up"
    | "pending_verify"
    | "verified"
    | "delivering"
    | "delivered"
    | "canceled"
    | "return"
    | "pending_return"
    | "returning"
    | "returned";

export type status_delivery = "pending" | "delivered" | "update_position";
export type order_method = "express" | "normal";

export interface IReceiver {
    name: string;
    phone: string;
    email?: string;
    province: string;
    district: string;
    ward: string;
    address_detail: string;
}

interface StatusOrder {
    status: status_order;
    msg?: string;
    date: Date;
}

interface StatusDelivery {
    status: status_delivery;
    msg?: string;
    date: Date;
}

export interface IOrder {
    id?: string;
    idShipper?: number;
    idCustomer: number;
    SenderName: string;
    SenderPhone: string;
    SenderAddress: string;
    SenderDetailsAddress: string;
    SenderCoordinates?: string;
    ReceiverName: string;
    ReceiverPhone: string;
    ReceiverAddress: string;
    ReceiverDetailsAddress: string;
    ReceiverCoordinates?: string;
    idTransport: number;
    isCOD: boolean;
    COD: number;
    isTakeShippingFee?: boolean;
    Note: string;
    ShippingFee: number;
    Created?: Date;
    DistanceToSender?: string;
}
