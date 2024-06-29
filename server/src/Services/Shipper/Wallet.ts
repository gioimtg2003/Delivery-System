import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { Log } from "../../Lib/Utils/Log";
import { IWallet } from "../../Lib/Types/Wallet";
import { ConvertIsoToString } from "../../Lib/Utils/converTimeStamp";

const AddWalletService = async (
    data: {
        Amount: number;
        idDriver: number;
        url: string;
    },
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let [wallet] = await pool.execute<ResultSetHeader>(
            "INSERT INTO driverwallet (idShipper, Amount, ImgUrl) VALUES (?, ?, ?)",
            [data.idDriver, data.Amount, data.url]
        );
        if (wallet.affectedRows > 0) {
            callback(null, true);
        } else {
            Log.Error(
                new Date(),
                "failed when save to database",
                "AddWalletService"
            );
            callback("failed", null);
        }
    } catch (error) {
        Log.Error(new Date(), error, "AddWalletService");
        callback("failed", null);
    }
};

const GetWalletService = async (
    id: number,
    callback: ICallback<any>
): Promise<void> => {
    try {
        pool.execute("set time_zone='+07:00'");
        let [data] = await pool.execute<(IWallet & RowDataPacket)[]>(
            "SELECT * FROM driverwallet WHERE idShipper = ? order by TimeSubmit desc",
            [id]
        );
        let _data = data.map((item) => ({
            ...item,
            TimeSubmit: ConvertIsoToString(item.TimeSubmit as string),
        }));
        callback(null, _data);
    } catch (error) {
        Log.Error(new Date(), error, "GetWalletService");
        callback("failed when get wallet", null);
    }
};

export { AddWalletService, GetWalletService };
