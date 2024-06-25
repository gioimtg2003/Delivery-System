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
        >(`select * from transporttype `);

        const result = await Promise.all(
            transport.map(async (item) => {
                let { distance, duration } = await Route(
                    sender,
                    receiver,
                    item.KeyName
                );
                console.log(distance, duration);
                if (item.KeyName == "scooter") {
                    item.Cost = (
                        distance <= 2000
                            ? item.CostLimit
                            : Math.ceil(distance / 1000) * item.Rate +
                              item.CostLimit
                    ).toFixed(0);
                } else {
                    item.Cost = CalculateCost(
                        distance,
                        item.Rate,
                        item.CostLimit
                    ).toFixed(0);
                }
                item.Distance = `${(distance / 1000).toFixed(2)}Km`;
                item.Duration = FormatTime(duration / 60);
                return item;
            })
        );

        return callback(null, result);
    } catch (error) {
        Log.Error(new Date(), error, "TransportCost");
        return callback("Có lỗi xảy ra", null);
    }
}
