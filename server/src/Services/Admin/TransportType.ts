import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { ITransportType } from "../../Lib/Types/TransportType";

export async function listTransport(
    callback: ICallback<ITransportType[]>
): Promise<void> {
    try {
        let [listTransport] = await pool.execute<
            (ITransportType & RowDataPacket)[]
        >("SELECT * FROM transporttype");
        return callback(null, listTransport);
    } catch (err) {
        return callback(err, null);
    }
}
