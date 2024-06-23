import { ResultSetHeader } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { Log } from "../../Lib/Utils/Log";

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

export { AddWalletService };
