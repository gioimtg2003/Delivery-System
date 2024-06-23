import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IWallet } from "../../Lib/Types/Wallet";
import { Log } from "../../Lib/Utils/Log";
import { convertTimeStamp } from "../../Lib/Utils/converTimeStamp";

const ListShipperWallet = async (
    callback: ICallback<(IWallet & { Name: string })[]>
): Promise<void> => {
    try {
        let [data] = await pool.execute<
            ((IWallet & { Name: string }) & RowDataPacket)[]
        >(
            "select shippers.Name as NameShipper, driverwallet.* from driverwallet inner join shippers on shippers.id = driverwallet.idShipper where driverwallet.Status = 'pending' order by driverwallet.TimeSubmit desc"
        );

        callback(null, data);
    } catch (error) {
        Log.Error(new Date(), error, "ListShipperWallet");
        callback("Error when get list", null);
    }
};

const ListHistoryShipperWallet = async (
    callback: ICallback<(IWallet & { Name: string })[]>
): Promise<void> => {
    try {
        let [data] = await pool.execute<
            ((IWallet & { Name: string }) & RowDataPacket)[]
        >(
            "select shippers.Name, driverwallet.* from driverwallet inner join shippers on shippers.id = driverwallet.idShipper where driverwallet.Status = 'accept' or driverwallet.Status = 'reject'"
        );

        callback(null, data);
    } catch (error) {
        Log.Error(new Date(), error, "ListShipperWallet");
        callback("Error when get list", null);
    }
};

const HandleSubmitWallet = async (
    data: { id: number; status: string; idEmployee: number },
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let [update] = await pool.execute<ResultSetHeader>(
            "update driverwallet set Status = ?, TimeUpdate = ? ,idEmployee = ? where id = ? ",
            [
                data.status,
                convertTimeStamp(Date.now()),
                data.idEmployee,
                data.id,
            ]
        );
        if (update.affectedRows === 0) {
            return callback("Wallet not found", null);
        }
        return callback(null, true);
    } catch (error) {
        Log.Error(new Date(), error, "HandleSubmitWallet");
        return callback("Error when update wallet", null);
    }
};

export { ListShipperWallet, HandleSubmitWallet, ListHistoryShipperWallet };
