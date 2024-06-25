import { ResultSetHeader, RowDataPacket } from "mysql2";
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
            "SELECT id, Balance, Status, Name, Phone, Email, Province, District, Ward, DetailsAddress, Created, OnlineStatus FROM shippers WHERE id = ?",
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

export async function UpdateStatusService(
    data: { online: boolean; id: number; coordinates?: string },
    callback: ICallback<boolean>
): Promise<void> {
    try {
        if (data.online === true && !data.coordinates) {
            Log.Info(
                new Date(),
                "failed",
                "Update status",
                "UpdateStatusService"
            );
            return callback("Coordinates is required", null);
        }
        let query = data.online
            ? "UPDATE shippers SET OnlineStatus = ? WHERE id = ?"
            : "UPDATE shippers SET OnlineStatus = ?, lat = ?, lng = ? WHERE id = ?";
        let value = data.online
            ? [data.online, data.id]
            : [
                  data.online,
                  data.coordinates?.split(",")[0],
                  data.coordinates?.split(",")[1],
                  data.id,
              ];
        let [update] = await pool.execute<ResultSetHeader>(query, value);
        if (update.affectedRows === 0) {
            Log.Info(
                new Date(),
                "failed",
                "Update status",
                "UpdateStatusService"
            );
            return callback("Update status failed", null);
        } else {
            Log.Info(
                new Date(),
                "success",
                "Update status",
                "UpdateStatusService"
            );
            return callback(null, true);
        }
    } catch (error) {
        Log.Error(new Date(), error, "UpdateStatusService");
        return callback("Error in UpdateStatusService", null);
    }
}
