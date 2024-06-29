import { ResultSetHeader } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipperIdentity } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";

const IdentityService = async (
    data: IShipperIdentity,
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let [shipper] = await pool.execute<ResultSetHeader>(
            `insert into shipperidentity (idShipper,ImgDriveLicenseBefore, ImgDriveLicenseAfter, ImgIdentityCardBefore, ImgIdentityCardAfter, ImgVehicleRegistrationCertBefore, ImgVehicleRegistrationCertAfter) values (?,?,?,?,?,?,?)`,
            [
                data.idShipper,
                data.ImgDriveLicenseBefore,
                data.ImgDriveLicenseAfter,
                data.ImgIdentityCardBefore,
                data.ImgIdentityCardAfter,
                data.ImgVehicleRegistrationCertBefore,
                data.ImgVehicleRegistrationCertAfter,
            ]
        );
        if (shipper.affectedRows === 0) {
            return callback("Bad request", null);
        } else {
            return callback(null, true);
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "IdentityService");
        return callback("Error when update Personal Identity", null);
    }
};

export { IdentityService };
