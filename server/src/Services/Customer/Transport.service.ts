import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { ITransportType } from "../../Lib/Types/TransportType";
import { CalculateCost, Route } from "../../Lib/Utils/Geocoding";
import { Log } from "../../Lib/Utils/Log";
import { FormatTime } from "../../Lib/Utils/formatTime";

interface ITransport {
    senderLng: number;
    senderLat: number;
    receiverLng: number;
    receiverLat: number;
    idTransport: number;
}
export async function TransportCost(
    data: ITransport,
    callback: ICallback<any>
): Promise<void> {
    try {
        let sender = {
            lat: data.senderLat,
            lng: data.senderLng,
        };
        let receiver = {
            lat: data.receiverLat,
            lng: data.receiverLng,
        };
        let [transport] = await pool.execute<
            (ITransportType & RowDataPacket)[]
        >(`select * from transporttype where id =?`, [data.idTransport]);
        const { distance, duration } = await Route(
            sender,
            receiver,
            transport[0].KeyName
        );
        console.log(distance, duration);
        if (transport[0].KeyName == "scooter") {
            transport[0].Cost =
                distance <= 2000
                    ? transport[0].CostLimit
                    : Math.ceil(distance / 1000) * transport[0].Rate +
                      transport[0].CostLimit;
        } else {
            transport[0].Cost = CalculateCost(
                distance,
                transport[0].Rate,
                transport[0].CostLimit
            );
        }
        transport[0].Distance = `${(distance / 1000).toFixed(3)}Km`;
        transport[0].Duration = FormatTime(Number((duration / 60).toFixed(0)));
        console.log(transport[0]);
        return callback(null, transport[0]);
    } catch (error) {
        Log.Error(new Date(), error, "TransportCost");
        return callback("Có lỗi xảy ra", null);
    }
}
