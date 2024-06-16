import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { ICustomer } from "../../Lib/Types/Customer";
import { Log } from "../../Lib/Utils/Log";
import { randomCode } from "../../Lib/Utils/randomCode";
import { convertTimeStamp } from "../../Lib/Utils/converTimeStamp";

interface IRes {
    err: boolean;
    message: string;
}

async function VerifyOTP(
    data: {
        otp: string;
        Phone: string;
    },
    callback: ICallback<IRes>
) {
    try {
        let [customer] = await pool.execute<(ICustomer & RowDataPacket)[]>(
            "select OTP, ExpOTP from customers where Phone = ?",
            [data.Phone]
        );
        if (customer.length === 0) {
            return callback(null, {
                err: true,
                message: "Phone không tồn tại",
            });
        }

        if (customer[0].ExpOTP < convertTimeStamp(Date.now())) {
            return callback(null, { err: true, message: "OTP đã hết hạn" });
        }
        if (customer[0].OTP !== data.otp) {
            return callback(null, { err: true, message: "OTP không đúng" });
        } else {
            await pool.execute("update customers set OTP = ? where Phone = ?", [
                1,
                data.Phone,
            ]);
            return callback(null, {
                err: false,
                message: "Xác thực thành công",
            });
        }
    } catch (error: any) {
        Log.Error(new Date(), error, "VerifyOTP");
        return callback("Lỗi khi thực hiện xác thực", null);
    }
}

async function ResendOtp(Phone: string, callback: ICallback<boolean>) {
    try {
        let code = randomCode();
        let [customer] = await pool.execute<ResultSetHeader>(
            "update customers set OTP = ?, ExpOTP = ? where Phone = ?",
            [code, convertTimeStamp(Date.now() + 60000 * 15), Phone]
        );
        console.log(customer);
        console.log(code);
        if (customer.affectedRows > 0) {
            Log.Info(
                new Date(),
                "Success",
                `Resend OTP to ${Phone}`,
                "ResendOtp"
            );
            return callback(null, true);
        } else {
            Log.Error(new Date(), "Failed", "ResendOtp");
            return callback("Lỗi khi gửi lại OTP", null);
        }
    } catch (error: any) {
        Log.Error(new Date(), error, "ResendOtp");
        return callback("Lỗi khi gửi lại OTP", null);
    }
}

export = { VerifyOTP, ResendOtp };
