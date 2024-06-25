import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IOrder } from "../../Lib/Types/Order";
import { ITransportType } from "../../Lib/Types/TransportType";
import { CalculateCost, Geocoding, Route } from "../../Lib/Utils/Geocoding";
import { Log } from "../../Lib/Utils/Log";
import { Status } from "../../Lib/Constants/Status";
import { v4 as uuidv4 } from "uuid";
interface IRes {
    err: boolean;
    msg: string;
    data: any;
}
export const CreateOrderService = async (
    order: IOrder,
    callback: ICallback<IRes>
): Promise<void> => {
    try {
        console.log(order);
        let SenderCoordinates = await Geocoding(order.SenderAddress);
        let ReceiverCoordinates = await Geocoding(order.ReceiverAddress);
        if (
            !(
                (SenderCoordinates.country === "Hồ Chí Minh" ||
                    SenderCoordinates.country === "Ho Chi Minh") &&
                (ReceiverCoordinates.country === "Hồ Chí Minh" ||
                    ReceiverCoordinates.country === "Ho Chi Minh")
            )
        ) {
            return callback(null, {
                err: true,
                msg: "not_support_location",
                data: null,
            });
        }
        let SenderCoordinatesString = `${SenderCoordinates.lat},${SenderCoordinates.lng}`;
        let ReceiverCoordinatesString = `${ReceiverCoordinates.lat},${ReceiverCoordinates.lng}`;
        let [transport] = await pool.execute<
            (ITransportType & RowDataPacket)[]
        >(`select * from transporttype where id = ?`, [order.idTransport]);
        const { distance } = await Route(
            SenderCoordinates,
            ReceiverCoordinates,
            transport[0].KeyName
        );
        let ShippingFee = 0;
        if (transport[0].KeyName == "scooter") {
            ShippingFee = Number(
                (distance <= 2000
                    ? transport[0].CostLimit
                    : Math.ceil(distance / 1000) * transport[0].Rate +
                      transport[0].CostLimit
                ).toFixed(0)
            );
        } else {
            ShippingFee = Number(
                CalculateCost(
                    distance,
                    transport[0].Rate,
                    transport[0].CostLimit
                ).toFixed(0)
            );
        }
        let idOrder = uuidv4();
        let [newOrder] = await pool.execute<ResultSetHeader>(
            "insert into orders (id, idCustomer, SenderName, SenderPhone, SenderAddress, SenderDetailsAddress, SenderCoordinates, ReceiverName, ReceiverPhone, ReceiverAddress, ReceiverDetailsAddress, ReceiverCoordinates, idTransportType, isCOD, COD, isTakeShippingFee, Note, Distance, ShippingFee) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                idOrder.toString(),
                order.idCustomer,
                order.SenderName,
                order.SenderPhone,
                order.SenderAddress,
                order.SenderDetailsAddress,
                SenderCoordinatesString,
                order.ReceiverName,
                order.ReceiverPhone,
                order.ReceiverAddress,
                order.ReceiverDetailsAddress,
                ReceiverCoordinatesString,
                order.idTransport,
                order.isCOD,
                order.COD,
                order.isTakeShippingFee,
                order.Note,
                distance,
                ShippingFee,
            ]
        );
        if (newOrder.affectedRows > 0) {
            Log.Info(
                new Date(),
                "success",
                `Create Order ID: ${idOrder}`,
                "CreateOrderService"
            );
            await pool.execute(
                "insert into orderstatus (idOrder, Status) values (?,?)",
                [idOrder, Status.PENDING]
            );
            return callback(null, {
                err: false,
                msg: "success",
                data: {
                    id: newOrder.insertId,
                    ShippingFee,
                },
            });
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "CreateOrderService");
        return callback(error, null);
    }
};
