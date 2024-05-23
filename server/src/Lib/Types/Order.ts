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

export interface Order {
    _id?: string;
    id_order: string;
    name: string;
    weight: number;
    price: number;
    payer: payer;
    quantity: number;
    total_amount: number;
    customer: IReceiver;
    id_driver?: ObjectId;
    id_employee?: ObjectId;
    id_post_office: ObjectId;
    method_pickup: method_pickup;
    status_order: StatusOrder[];
    status_order_current: status_order;
    status_delivery: StatusDelivery[];
    order_type: order_method;
    desc: string;
    address_pickup?: string;
    created_at?: Date;
}
