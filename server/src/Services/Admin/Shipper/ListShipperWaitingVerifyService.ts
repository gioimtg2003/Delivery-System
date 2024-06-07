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
            "select shippers.id, shippers.Name, shippers.Email, shippers.Phone, shippers.Province, shippers.District, shippers.Ward, shippers.Hamlet, shippers.Verify, shippers.Created from shippers where shippers.Verify = 0 order by Created desc"
        );
        Log.Info(
            new Date(),
            "ListShipperWaitingVerifyService",
            "listShipper",
            "List Shipper Waiting Verify"
        );
        return callback(null, data);
    } catch (err) {
        Log.Error(new Date(), err, "listShipper");
        return callback("Error get shipper", null);
    }
}

export { ListShipperWaitingVerifyService };
