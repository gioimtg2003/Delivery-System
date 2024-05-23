import { ObjectId } from "mongoose";

type user_type = "customer" | "driver" | "employee";
type service = "order" | "customer" | "driver" | "post_office";
type action = "create" | "read" | "update" | "delete";

export interface Log {
    _id?: string;
    user_id: ObjectId;
    user_type: user_type;
    service: service;
    action: action;
    msg: string;
    created_at?: Date;
}
