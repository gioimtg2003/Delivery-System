import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { ICustomer } from "../../Lib/Types/Customer";
import { Log } from "../../Lib/Utils/Log";

export const GetCustomerByIdService = async (
    id: number,
    callback: ICallback<ICustomer>
): Promise<void> => {
    try {
        let [customer] = await pool.execute<(ICustomer & RowDataPacket)[]>(
            "select id, Name, Phone, Email from customers where id = ?",
            [id]
        );
        if (customer.length === 0) {
            return callback("Customer Not Found", null);
        } else {
            return callback(null, customer[0]);
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "GetCustomerByIdService");
        return callback("Get Customer Profile", null);
    }
};
