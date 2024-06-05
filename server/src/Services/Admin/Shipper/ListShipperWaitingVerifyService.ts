import { RowDataPacket } from "mysql2";
import { ICallback } from "../../../Lib/Types/Callback";
import { IShipper, IShipperIdentity } from "../../../Lib/Types/Shipper";
import pool from "../../../Database/mysql";
import { Log } from "../../../Lib/Utils/Log";
type IData = (IShipper & IShipperIdentity) & RowDataPacket;

async function ListShipperWaitingVerifyService(
    callback: ICallback<IData[]>
): Promise<void> {
    try {
        let [data] = await pool.execute<IData[]>(
            "select id from shipper inner join shipperidentity on shippers.id = shipperidentity.idShipper where shippers.Verify = 0"
        );
        Log.Info(
            new Date(),
            "ListShipperWaitingVerifyService",
            "listShipper",
            "List Shipper Waiting Verify"
        );
        return callback(null, data);
    } catch (err) {
        Log.Error(new Date(), "ListShipperWaitingVerifyService", "listShipper");
        return callback(err, null);
    }
}

export { ListShipperWaitingVerifyService };
