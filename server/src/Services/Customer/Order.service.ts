import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IOrder, TStatus } from "../../Lib/Types/Order";
import { ITransportType } from "../../Lib/Types/TransportType";
import { CalculateCost, Geocoding, Route } from "../../Lib/Utils/Geocoding";
import { Log } from "../../Lib/Utils/Log";
import { Status } from "../../Lib/Constants/Status";
import { v4 as uuidv4 } from "uuid";
import {
    ConvertIsoToString,
    convertTimeStamp,
} from "../../Lib/Utils/converTimeStamp";
import { PoolConnection } from "mysql2/promise";
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
        console.log(order);
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

export const HistoryOrderService = async (
    id: number,
    callback: ICallback<IOrder[]>
): Promise<void> => {
    try {
        let [order] = await pool.execute<(IOrder & RowDataPacket)[]>(
            "select orders.id, SenderAddress, ReceiverAddress, CurrentStatus, TimeCurrentStatus, transporttype.Name as TransportName from orders inner join transporttype on orders.idTransportType = transporttype.id where idCustomer = ?   order by Created desc",
            [id]
        );
        return callback(
            null,
            order.map((item) => ({
                ...item,
                TimeCurrentStatus: ConvertIsoToString(
                    item.TimeCurrentStatus as string
                ),
            }))
        );
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "HistoryOrderService");
        return callback("Error when get history orders", null);
    }
};

export const PickedUpOrderService = async (
    data: {
        idOrder: string;
        id: number;
    },
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let time = convertTimeStamp(Date.now());
        let [update] = await pool.execute<ResultSetHeader>(
            "update orders set CurrentStatus = ?, TimeCurrentStatus = ? where id = ? and idCustomer = ? and idShipper is not null and CurrentStatus = 'pending_pickup'",
            [Status.PICKED_UP, time, data.idOrder, data.id]
        );
        if (update.affectedRows === 0) {
            return callback("Bad request", null);
        } else {
            await pool.execute(
                "insert into orderstatus (idOrder, Status, Created) values (?,?,?)",
                [data.idOrder, Status.PICKED_UP, time]
            );
            callback(null, true);
        }
    } catch (err) {
        console.error(err);
        Log.Error(new Date(), err, "PickedUpOrderService");
        return callback("Error when update picked up order", null);
    }
};

export const GetOrderDetailService = async (
    data: {
        idOrder: string;
        idCustomer: number;
    },
    callback: ICallback<IOrder>
): Promise<void> => {
    try {
        let [order] = await pool.execute<(IOrder & RowDataPacket)[]>(
            "select id, SenderName, SenderPhone, SenderAddress, SenderDetailsAddress, SenderCoordinates, ReceiverName, ReceiverPhone, ReceiverAddress, ReceiverDetailsAddress, ReceiverCoordinates, idTransportType, isCOD, COD, isTakeShippingFee, Note, Distance, ShippingFee, CurrentStatus, TimeCurrentStatus from orders  where orders.id = ? and idCustomer = ?",
            [data.idOrder, data.idCustomer]
        );

        if (order.length === 0) {
            return callback("Order not found", null);
        }
        return callback(null, {
            ...order[0],
            TimeCurrentStatus: ConvertIsoToString(
                order[0].TimeCurrentStatus as string
            ),
        });
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "GetOrderDetailService");
        return callback("Error when get order detail", null);
    }
};

export const UpdateStatusOrderService = async (
    data: {
        idOrder: string;
        idCustomer: number;
        Status: TStatus;
    },
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        // chưa kiểm tra đã có shipper nhận đơn chưa lúc set status picked_up
        let [update] = await pool.execute<ResultSetHeader>(
            "update orders set CurrentStatus = ?, TimeCurrentStatus = ? where id = ? and idCustomer = ?",
            [
                data.Status,
                convertTimeStamp(Date.now()),
                data.idOrder,
                data.idCustomer,
            ]
        );
        if (update.affectedRows === 0) {
            return callback("Bad request", null);
        } else {
            await pool.execute(
                "insert into orderstatus (idOrder, Status) values (?,?)",
                [data.idOrder, data.Status]
            );
            if (data.Status === "cancel") {
                await pool.execute(
                    "update shippers set idOrder = null where idOrder = ?",
                    [data.idOrder]
                );
            }
            return callback(null, true);
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "UpdateStatusOrderService");
        return callback("Error when update status order", null);
    }
};
