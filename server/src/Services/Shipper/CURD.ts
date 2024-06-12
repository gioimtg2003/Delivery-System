import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipper } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";

export async function GETDriverByIdService(
    id: number,
    callback: ICallback<IShipper>
): Promise<void> {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "SELECT id, Name, Phone, Email, Province, District, Ward, DetailsAddress, Created FROM shippers WHERE id = ?",
            [id]
        );
        if (driver.length === 0) {
            Log.Info(
                new Date(),
                "failed",
                "Driver found",
                "GETDriverByIdService"
            );
            return callback("Driver not found", null);
        } else {
            Log.Info(
                new Date(),
                "success",
                "Driver found",
                "GETDriverByIdService"
            );
            return callback(null, driver[0]);
        }
    } catch (error) {
        Log.Error(new Date(), error, "GETDriverByIdService");
        return callback("Error in GETDriverByIdService", null);
    }
}
