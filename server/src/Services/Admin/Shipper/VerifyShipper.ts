import { ResultSetHeader } from "mysql2";
import pool from "../../../Database/mysql";
import { ICallback } from "../../../Lib/Types/Callback";

export class VerifyShipper {
    public async verifyShipper(
        idShipper: string,
        callback: ICallback<boolean>
    ): Promise<void> {
        try {
            let [verify] = await pool.execute<ResultSetHeader>(
                `update shippers set Verify = 1 where ${idShipper}`
            );
            if (verify.affectedRows > 0) {
                callback(null, true);
            }
        } catch (err) {}
    }
}
