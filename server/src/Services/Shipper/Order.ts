import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../Database/mysql";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipper } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";
import { ITransportVisibleRules } from "../../Lib/Types/TransportType";
import { IOrder } from "../../Lib/Types/Order";
import { CalculateDistance } from "../../Lib/Utils/CalculateDistance";
import { CheckBalance } from "../../Lib/Utils/CheckBalance";
import { PoolConnection } from "mysql2/promise";
import { Status } from "../../Lib/Constants/Status";
import { convertTimeStamp } from "../../Lib/Utils/converTimeStamp";

const GetOrdersService = async (
    id: number,
    callback: ICallback<IOrder[]>
): Promise<void> => {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select lat, lng, OnlineStatus, idTransport from shippers where id = ?",
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
        } else if (driver[0].OnlineStatus === 0) {
            Log.Info(
                new Date(),
                "failed",
                "Driver not online",
                "GetOrdersService"
            );
            return callback("Driver not online", null);
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
                `select id, Distance, SenderAddress, SenderCoordinates, ReceiverAddress, Note, ShippingFee from orders where isnull(idShipper) and CurrentStatus = 'pending' and (${idTransport})`
            );
            // sort
            orders.map((order) => {
                if (driver[0].lat && driver[0].lng && order.SenderCoordinates) {
                    order.DistanceToSender = Number(
                        CalculateDistance(
                            Number(driver[0].lat),
                            Number(driver[0].lng),
                            Number(order.SenderCoordinates.split(",")[0]),
                            Number(order.SenderCoordinates.split(",")[1])
                        )
                    );
                }
            });

            orders.sort((a, b) => {
                if (a.DistanceToSender && b.DistanceToSender) {
                    return a.DistanceToSender - b.DistanceToSender;
                } else {
                    return 0;
                }
            });

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
    console.log(data);
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
                order[0].DistanceToSender = Number(
                    CalculateDistance(
                        Number(driver[0].lat),
                        Number(driver[0].lng),
                        Number(order[0].SenderCoordinates.split(",")[0]),
                        Number(order[0].SenderCoordinates.split(",")[1])
                    )
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
        data: any;
    }>
): Promise<void> => {
    let conn: PoolConnection | null = null;
    try {
        // check transport match with driver
        conn = await pool.getConnection();
        await conn.beginTransaction();
        let [driver] = await conn.execute<(IShipper & RowDataPacket)[]>(
            "select Balance, idTransport, OnlineStatus, Status from shippers where id = ?",
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
        } else if (
            driver[0].OnlineStatus === 1 &&
            driver[0].Status === "Free"
        ) {
            let [order] = await conn.execute<(IOrder & RowDataPacket)[]>(
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
                console.log(
                    CheckBalance(
                        driver[0].Balance,
                        Number(order[0].ShippingFee)
                    )
                );
                return callback(null, {
                    error: true,
                    data: "not_enough_balance",
                });
            } else {
                await conn.execute(
                    'update shippers set Status = "Delivering", idOrder = ? where id = ?',
                    [data.id, data.idUser]
                );
                await conn.execute(
                    'update orders set idShipper = ?, CurrentStatus = "pending_pickup" where id = ?',
                    [data.idUser, data.id]
                );
                await conn.execute(
                    'insert into orderstatus (idOrder, Status) values (?, "pending_pickup")',
                    [data.id]
                );
                let balance = order[0] ? order[0].ShippingFee * 0.12 : 0;
                await conn.execute(
                    "update shippers set Balance = Balance - ? where id = ?",
                    [balance, data.idUser]
                );
                Log.Info(
                    new Date(),
                    "success",
                    "Pickup order success",
                    "PickupOrderService"
                );
                await conn.commit();
                return callback(null, {
                    error: false,
                    data: "Pickup order success",
                });
            }
        } else if (driver[0].Status === "Delivering") {
            Log.Info(new Date(), "failed", "Driver busy", "PickupOrderService");
            return callback(null, {
                error: true,
                data: "driver_busy",
            });
        } else {
            Log.Info(
                new Date(),
                "failed",
                "Driver not online",
                "PickupOrderService"
            );
            return callback("Driver not online", null);
        }
    } catch (error) {
        await conn?.rollback();
        console.error(error);
        Log.Error(new Date(), error, "PickupOrderService");
        callback("Error when pickup order", null);
    } finally {
        conn?.release();
    }
};

const GetOrderDetailsPickupService = async (
    {
        id,
    }: {
        id: number;
    },
    callback: ICallback<IOrder>
): Promise<void> => {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select idOrder, OnlineStatus, Status from shippers where id = ? and idOrder is not null",
            [id]
        );
        if (driver.length === 0) {
            return callback("Driver not found", null);
        } else if (
            driver[0].OnlineStatus === 0 ||
            driver[0].Status === "Free"
        ) {
            return callback("Driver not busy", null);
        } else {
            let [order] = await pool.execute<(IOrder & RowDataPacket)[]>(
                "select id, SenderName, SenderPhone, SenderAddress, SenderCoordinates, ReceiverName, ReceiverPhone, ReceiverAddress, Note, isCOD, isTakeShippingFee, COD, ShippingFee, ReceiverCoordinates, CurrentStatus from orders where id = ?  and idShipper is not null",
                [driver[0].idOrder]
            );
            console.log(order);
            order[0].Charge = Number(
                (order[0].ShippingFee - order[0].ShippingFee * 0.12).toFixed(0)
            );
            return callback(null, order[0]);
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "GetOrderDetailsPickupService");
        return callback("Error when get order details", null);
    }
};

const UpdatePickupOrderService = async (
    id: number,
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select idOrder, Status, OnlineStatus from shippers where id = ? and idOrder is not null",
            [id]
        );
        if (driver.length === 0) {
            return callback("Driver not found", null);
        } else if (
            driver[0].OnlineStatus === 0 ||
            driver[0].Status === "Free"
        ) {
            return callback("Driver not busy", null);
        } else {
            let [order] = await pool.execute<ResultSetHeader>(
                "update orders set CurrentStatus = ? where id = ? and CurrentStatus = ? and idShipper = ?",
                [Status.DELIVERY, driver[0].idOrder, Status.PICKED_UP, id]
            );
            if (order.affectedRows === 0) {
                return callback("cannot_update", null);
            } else {
                await pool.execute(
                    "insert into orderstatus (idOrder, Status) values (?, ?)",
                    [driver[0].idOrder, Status.DELIVERY]
                );
                return callback(null, true);
            }
        }
    } catch (error) {
        console.error(error);
        Log.Error(new Date(), error, "UpdatePickupOrderService");
        return callback("Error when Picked up order", null);
    }
};

const DeliverySuccessOrderService = async (
    id: number,
    callback: ICallback<boolean>
): Promise<void> => {
    try {
        let [driver] = await pool.execute<(IShipper & RowDataPacket)[]>(
            "select idOrder, Status, OnlineStatus from shippers where id = ? and idOrder is not null",
            [id]
        );
        if (driver.length === 0) {
            return callback("Driver not found", null);
        } else if (
            driver[0].OnlineStatus === 0 ||
            driver[0].Status === "Free"
        ) {
            return callback("Driver not busy", null);
        } else {
            let [order] = await pool.execute<ResultSetHeader>(
                "update orders set CurrentStatus = ? where id = ? and CurrentStatus = ? and idShipper = ?",
                [Status.SUCCESS, driver[0].idOrder, Status.DELIVERY, id]
            );
            if (order.affectedRows === 0) {
                return callback("cannot_update", null);
            } else {
                await pool.execute(
                    "insert into orderstatus (idOrder, Status) values (?, ?)",
                    [driver[0].idOrder, Status.SUCCESS]
                );
                await pool.execute(
                    "update shippers set Status = 'Free', idOrder = null where id = ?",
                    [id]
                );
                return callback(null, true);
            }
        }
    } catch (err) {
        console.error(err);
        Log.Error(new Date(), err, "DeliverySuccessOrderService");
        return callback("Error when Complete Order", null);
    }
};

export {
    GetOrdersService,
    GetOrderPendingDetailsService,
    PickupOrderService,
    GetOrderDetailsPickupService,
    UpdatePickupOrderService,
    DeliverySuccessOrderService,
};
