import { ResultSetHeader } from "mysql2";
import pool from "../../../Database/mysql";
import { ICallback } from "../../../Lib/Types/Callback";
import { IShipperIdentity } from "../../../Lib/Types/Shipper";
import { Log } from "../../../Lib/Utils/Log";

export async function SaveIdentity(
    data: IShipperIdentity,
    callback: ICallback<{ error: boolean; msg: string }>
): Promise<void> {
    try {
        let [save] = await pool.execute<ResultSetHeader>(
            "INSERT INTO shipperidentity (idShipper, ImgDriveLicenseBefore, ImgDriveLicenseAfter, ImgIdentityCardAfter, ImgIdentityCardBefore, ImgVehicleRegistrationCertBefore, ImgVehicleRegistrationCertAfter) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.idShipper,
                data.ImgDriveLicenseBefore,
                data.ImgDriveLicenseAfter,
                data.ImgIdentityCardAfter,
                data.ImgIdentityCardBefore,
                data.ImgVehicleRegistrationCertBefore,
                data.ImgVehicleRegistrationCertAfter,
            ]
        );
        if (save.affectedRows === 0) {
            Log.Error(new Date(), "Save failed", "SaveIdentity Service");
            return callback(null, { error: true, msg: "Save failed" });
        } else {
            let [update] = await pool.execute<ResultSetHeader>(
                "UPDATE shippers SET Verify = 1 WHERE id = ?",
                [data.idShipper]
            );
            let [_update] = await pool.execute<ResultSetHeader>(
                "UPDATE shipperidentity SET Status = 'verified' WHERE id = ?",
                [data.idShipper]
            );
            if (update.affectedRows === 0 && _update.affectedRows === 0) {
                Log.Error(new Date(), "Update failed", "SaveIdentity Service");
                return callback(null, { error: true, msg: "Save failed" });
            } else {
                Log.Info(
                    new Date(),
                    "success",
                    "Oke nef",
                    "SaveIdentity Service"
                );
                return callback(null, {
                    error: false,
                    msg: "Save successfully!",
                });
            }
        }
    } catch (err) {
        Log.Error(new Date(), err, "SaveIdentity Service");
        return callback("Error while save", null);
    }
}
