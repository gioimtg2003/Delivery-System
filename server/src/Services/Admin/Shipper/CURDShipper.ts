import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../../Database/mysql";
import { ICallback } from "../../../Lib/Types/Callback";
import { IShipper } from "../../../Lib/Types/Shipper";
import { Log } from "../../../Lib/Utils/Log";
import { HashPassword } from "../../Hash";

interface IData {
    id: number;
    Name: string;
    Phone: string;
    Email: string;
}

type RowDataShipper = RowDataPacket & IShipper;

export class CURDShipper {
    private _hashPassword: HashPassword;
    constructor() {
        this._hashPassword = new HashPassword();
    }

    public async createInfoShipper(
        shipper: IShipper,
        callback: ICallback<IData>
    ): Promise<void> {
        console.log(shipper);
        try {
            let [createShipper] = await pool.execute<ResultSetHeader>(
                "INSERT INTO shippers (Name, Province, District, Ward, Hamlet, DetailsAddress, Phone, Email, Password, Verify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    shipper.Name,
                    shipper.Province,
                    shipper.District,
                    shipper.Ward,
                    shipper.Hamlet,
                    shipper.DetailsAddress,
                    shipper.Phone,
                    shipper.Email,
                    this._hashPassword.hashPassword(
                        shipper?.Password as string
                    ),
                    false,
                ]
            );

            if (createShipper.affectedRows === 0) {
                Log.Error(
                    new Date(),
                    "Create Shipper Fail",
                    "Create Shipper Service"
                );
                return callback(new Error("Create Shipper Fail"), null);
            } else {
                let id = createShipper.insertId;
                return callback(null, {
                    id,
                    Name: shipper.Name,
                    Phone: shipper.Phone,
                    Email: shipper.Email,
                });
            }
        } catch (error: any) {
            Log.Error(
                new Date(),
                error.sqlMessage ?? error,
                "Create Shipper Service"
            );
            if ("Duplicate entry".includes(error.sqlMessage)) {
                return callback("Đã tồn tại User này", null);
            }
            return callback("Create Shipper Error", null);
        }
    }

    public async listShipper(callback: ICallback<IShipper[]>): Promise<void> {
        try {
            let [listShipper] = await pool.execute<RowDataShipper[]>(
                "SELECT id, Name, Phone, Email, Province, District, Ward, Hamlet, DetailsAddress, Created, Verify FROM shippers order by Created desc"
            );

            if (listShipper.length === 0) {
                Log.Error(
                    new Date(),
                    "List Shipper Fail",
                    "List Shipper Service"
                );
                return callback(new Error("List Shipper Fail"), null);
            } else {
                return callback(null, listShipper);
            }
        } catch (error: any) {
            Log.Error(
                new Date(),
                error.sqlMessage ?? error,
                "List Shipper Service"
            );

            return callback("List Shipper Error", null);
        }
    }
}
