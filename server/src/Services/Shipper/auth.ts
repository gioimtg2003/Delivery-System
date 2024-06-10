import { ResultSetHeader } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { Log } from "../../Lib/Utils/Log";

interface ISignUp {
    Email: string;
    Name: string;
    Password: string;
    Phone: string;
}
const SignUp = async (
    data: ISignUp,
    callback: ICallback<{
        err: boolean;
        data: any;
    }>
): Promise<void> => {
    try {
        let [shipper] = await pool.execute<ResultSetHeader>(
            "insert into shippers (Name, Email, Phone, Password) values (?, ?, ?, ?)",
            [data.Name, data.Email, data.Phone, data.Password]
        );
        if (shipper.affectedRows === 0) {
            return callback("Lỗi trong khi tạo tài khoản", null);
        } else {
            return callback(null, {
                err: false,
                data: {
                    Email: data.Email,
                    Name: data.Name,
                    Phone: data.Phone,
                    id: shipper.insertId,
                },
            });
        }
    } catch (err: any) {
        Log.Error(new Date(), err, "SignUp");
        if (err.code === "ER_DUP_ENTRY") {
            return callback("Email hoặc số điện thoại đã tồn tại", null);
        }
        return callback("Lỗi trong khi tạo tài khoản", null);
    }
};

export { SignUp };
