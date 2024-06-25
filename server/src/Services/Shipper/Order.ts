import { RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipper } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";
import { ITransportVisibleRules } from "../../Lib/Types/TransportType";
import { IOrder } from "../../Lib/Types/Order";
import { CalculateDistance } from "../../Lib/Utils/CalculateDistance";
import { CheckBalance } from "../../Lib/Utils/CheckBalance";

const GetOrdersService = async (
    id: number,
    callback: ICallback<IOrder[]>
): Promise<void> => {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select idTransport from shippers where id = ?",
            [id]
        );
        if (driver.length === 0 || driver[0].idTransport === null) {
            Log.Info(
                new Date(),
                "failed",
                "Driver not found",
                "GetOrdersService"
            );
            return callback("Driver not found", null);
        } else {
            let [transportVisible] = await pool.execute<
                (ITransportVisibleRules & RowDataPacket)[]
            >(
                "select CanSeeTransportTypeId from transportvisiblerules where TransportTypeId = ?",
                [driver[0].idTransport]
            );
            let idTransport: string = `idTransportType = ${driver[0].idTransport}`;
            if (transportVisible.length > 0) {
                transportVisible.forEach((item) => {
                    idTransport += ` or idTransportType = ${item.CanSeeTransportTypeId}`;
                });
            }
            let [orders] = await pool.execute<(IOrder & RowDataPacket)[]>(
                `select id, Distance, SenderAddress, ReceiverAddress, Note, ShippingFee from orders where isnull(idShipper) and CurrentStatus = 'pending' and (${idTransport})`
            );
            return callback(null, orders);
        }
    } catch (error) {
        Log.Error(new Date(), error, "GetOrdersService");
        callback("Error when get orders", null);
    }
};

const GetOrderPendingDetailsService = async (
    data: { id: string; idUser: number },
    callback: ICallback<IOrder>
): Promise<void> => {
    try {
        let [order] = await pool.execute<(IOrder & RowDataPacket)[]>(
            "select id, SenderAddress, SenderCoordinates, ReceiverAddress, Note, isCOD, COD, ShippingFee, ReceiverCoordinates from orders where id = ? and CurrentStatus = 'pending' and isnull(idShipper)",
            [data.id]
        );
        if (order.length === 0) {
            Log.Info(
                new Date(),
                "failed",
                "Order not found",
                "GetOrderPendingDetailsService"
            );
            return callback("Order not found", null);
        } else {
            let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
                "select lat, lng from shippers where id = ?",
                [data.idUser]
            );
            console.log(driver[0]);
            if (driver[0].lat && driver[0].lng && order[0].SenderCoordinates) {
                order[0].DistanceToSender = CalculateDistance(
                    Number(driver[0].lat),
                    Number(driver[0].lng),
                    Number(order[0].SenderCoordinates.split(",")[0]),
                    Number(order[0].SenderCoordinates.split(",")[1])
                );
            }
            return callback(null, order[0]);
        }
    } catch (error) {
        Log.Error(new Date(), error, "GetOrderPendingDetailsService");
        callback("Error when get order details", null);
    }
};

const PickupOrderService = async (
    data: {
        id: string;
        idUser: number;
    },
    callback: ICallback<{
        error: boolean;
        msg: string;
    }>
): Promise<void> => {
    try {
        // check transport match with driver
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select Balance, idTransport from shippers where id = ?",
            [data.idUser]
        );
        if (driver.length === 0) {
            Log.Info(
                new Date(),
                "failed",
                "Driver not found",
                "PickupOrderService"
            );
            return callback("Driver not found", null);
        } else {
            let [order] = await pool.execute<(IOrder & RowDataPacket)[]>(
                'select ShippingFee from orders where id = ? and CurrentStatus = "pending" and isnull(idShipper)',
                [data.id]
            );
            if (order.length === 0) {
                Log.Info(
                    new Date(),
                    "failed",
                    "Order not found",
                    "PickupOrderService"
                );
                return callback("Order not found", null);
            } else if (
                !CheckBalance(driver[0].Balance, Number(order[0].ShippingFee))
            ) {
                Log.Info(
                    new Date(),
                    "failed",
                    "not_enough_balance",
                    "PickupOrderService"
                );
                return callback(null, {
                    error: true,
                    msg: "not_enough_balance",
                });
            } else {
                await pool.execute(
                    'update orders set idShipper = ?, CurrentStatus = "pending_pickup" where id = ?',
                    [data.idUser, data.id]
                );
                let balance = order[0] ? order[0].ShippingFee * 0.12 : 0;
                await pool.execute(
                    "update shippers set Balance = Balance - ? where id = ?",
                    [balance, data.idUser]
                );
            }
        }
    } catch (error) {}
};

export { GetOrdersService, GetOrderPendingDetailsService };
