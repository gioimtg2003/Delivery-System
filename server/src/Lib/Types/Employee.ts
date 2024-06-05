import { RowDataPacket } from "mysql2/promise";

export interface IEmployee {
    id?: string;
    Name: string;
    Password?: string;
    Email: string;
    Phone: string;
    Role: string;
}
