import { ResultSetHeader, RowDataPacket } from "mysql2";
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
            "select shippers.id, shippers.Name, shippers.Email, shippers.Phone, shippers.Province, shippers.District, shippers.Ward, shippers.Hamlet, shippers.Verify, shippers.Created from shippers inner join shipperidentity on shippers.id = shipperidentity.idShipper where shippers.Verify = 0 order by Created desc"
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
async function GetDetailsShipperWaitingVerifyService(
    id: number,
    callback: ICallback<IShipper>
): Promise<void> {
    try {
        let [data] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select shippers.id, shippers.Name, shippers.Email, shippers.Phone, shippers.Province, shippers.District, shippers.Ward, shippers.Hamlet, shippers.Verify, shippers.Created, shipperidentity.*, transporttype.Name as TransportName, transporttype.ImgUrl from shippers inner join shipperidentity on shippers.id = shipperidentity.idShipper inner join transporttype on transporttype.id = shippers.idTransport where shippers.id =?",
            [id]
        );
        Log.Info(
            new Date(),
            "GetDetailsShipperWaitingVerifyService",
            "getDetailsShipper",
            "Get Details Shipper Waiting Verify"
        );
        return callback(null, data[0]);
    } catch (err) {
        Log.Error(new Date(), err, "getDetailsShipper");
        return callback("Error get details shipper", null);
    }
}

async function VerifyShipperService(
    data: {
        id: number;
        verify: boolean;
    },
    callback: ICallback<boolean>
): Promise<void> {
    try {
        let [update_identity] = await pool.execute<ResultSetHeader>(
            "update shipperidentity set Status = ? where idShipper = ?",
            [data.verify ? "verified" : "cancel", data.id]
        );
        let [update_shipper] = await pool.execute<ResultSetHeader>(
            "update shippers set Verify = ? where id = ?",
            [data.verify ? 1 : 0, data.id]
        );
        if (
            update_identity.affectedRows > 0 &&
            update_shipper.affectedRows > 0
        ) {
            Log.Info(
                new Date(),
                "VerifyShipperService",
                "update",
                "Update Shipper Success"
            );
            return callback(null, true);
        } else {
            Log.Info(
                new Date(),
                "VerifyShipperService",
                "update",
                "Update Shipper Fail"
            );
            return callback("Error while update", false);
        }
    } catch (err) {
        Log.Error(new Date(), err, "VerifyShipperService");
        return callback("Error while update", null);
    }
}
export {
    ListShipperWaitingVerifyService,
    GetDetailsShipperWaitingVerifyService,
    VerifyShipperService,
};
