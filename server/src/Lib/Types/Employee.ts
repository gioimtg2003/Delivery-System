import { ObjectId } from "mongoose";
export interface Employee {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    post_offices: ObjectId;
    role: string;
    created_at?: Date;
}
