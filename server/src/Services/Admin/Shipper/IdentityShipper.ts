import { ResultSetHeader } from "mysql2";
import pool from "../../../Database/mysql";
import { ICallback } from "../../../Lib/Types/Callback";
import { IShipperIdentity } from "../../../Lib/Types/Shipper";
import { Log } from "../../../Lib/Utils/Log";

export async function SaveIdentity(
    data: IShipperIdentity,
    callback: ICallback<{ error: boolean; msg: string }>
): Promise<void> {
    pool.getConnection().then((conn) => {
        conn.beginTransaction().then(async () => {
            try {
                let [save] = await conn.query<ResultSetHeader>(
                    "INSERT INTO shipperidentity (idShipper, idTransportType, ImgDriveLicenseBefore, ImgDriveLicenseAfter, ImgIdentityCardAfter, ImgIdentityCardBefore, ImgVehicleRegistrationCertBefore, ImgVehicleRegistrationCertAfter) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        data.idShipper,
                        data.idTransportType,
                        data.ImgDriveLicenseBefore,
                        data.ImgDriveLicenseAfter,
                        data.ImgIdentityCardAfter,
                        data.ImgIdentityCardBefore,
                        data.ImgVehicleRegistrationCertBefore,
                        data.ImgVehicleRegistrationCertAfter,
                    ]
                );
                if (save.affectedRows === 0) {
                    conn.rollback();
                    Log.Error(
                        new Date(),
                        "Save failed",
                        "SaveIdentity Service"
                    );
                    return callback(null, { error: true, msg: "Save failed" });
                } else {
                    conn.query("UPDATE shippers SET Verify = 1 WHERE id = ?", [
                        data.idShipper,
                    ])
                        .then((value) => {
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
                        })
                        .catch((err) => {
                            conn.rollback();
                            Log.Error(new Date(), err, "SaveIdentity Service");
                            return callback("Error while save", null);
                        });

                    conn.commit();
                    conn.release();
                }
            } catch (err) {
                conn.rollback();
                Log.Error(new Date(), err, "SaveIdentity Service");
                return callback("Error while save", null);
            }
        });
    });
}
