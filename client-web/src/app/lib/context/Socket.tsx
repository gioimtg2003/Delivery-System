"use client";
import { useCallback, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { grantAccessToken } from "../util/axios";
import { notification } from "antd";
import { EventContext } from "./event/EventProvider";
import { EventActionType } from "./event/type";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    SocketInstance,
} from "../SocketInstance";

const SocketProvider = (): JSX.Element => {
    const [api, contextHolder] = notification.useNotification();
    const { state, dispatch } = useContext(EventContext);
    const addSocketEvents = useCallback(
        (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => {
            socket.on("connect", () => {
                console.log("connected to socket");
                socket.on("required_token", async () => {
                    // console.log("required_token");
                    socket.auth = {
                        token: await grantAccessToken(),
                    };
                    socket.open();
                });
                socket.on("status_order", (data) => {
                    api[
                        data.description.indexOf("thành công") > 0
                            ? "success"
                            : "error"
                    ]({
                        message: data.message,
                        description: data.description,
                    });
                });
                socket.on("shipper_status", (data) => {
                    // console.log("shipper_status", data);
                    api[data.status === "offline" ? "warning" : "success"]({
                        message:
                            data.status[0].toUpperCase() + data.status.slice(1),
                        description: data.message,
                    });
                    dispatch({
                        type: EventActionType.STATUS_SHIPPER,
                        payload: { statusShipper: data },
                    });
                });
                socket.on("shipper_location", (data) => {
                    dispatch({
                        type: EventActionType.LOCATION_SHIPPER,
                        payload: { locationShipper: data },
                    });
                });
                socket.on("pickup_order", (data) => {
                    api.success({
                        message: data.message,
                        description: data.description,
                    });
                });
            });
        },
        []
    );

    useEffect(() => {
        const socket = SocketInstance.getInstance();
        addSocketEvents(socket);
        return () => {
            socket.off("connect");
            socket.off("shipper_status");
            socket.off("shipper_location");
            socket.off("pickup_order");
        };
    }, [addSocketEvents]);
    return <>{contextHolder}</>;
};

export default SocketProvider;
