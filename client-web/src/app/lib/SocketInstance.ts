import { Socket, io } from "socket.io-client";
import { grantAccessToken } from "./util/axios";
import { useToken } from "./hook/useToken";
import { getServerSideProps } from "./constant/config";

type statusShipper = "online" | "offline";

export interface DataEvent {
    status_shipper: {
        id: string;
        status: statusShipper;
        message: string;
        Online: boolean;
    };
    location_shipper: {
        id: string;
        lat: number;
        lng: number;
    };
    pickup_order: {
        message: string;
        description: string;
    };
    status_order: {
        message: string;
        description: string;
    };
}

export interface ServerToClientEvents {
    NotificationOrder: (data: DataOrder) => void;
    shipper_status: (data: DataEvent["status_shipper"]) => void;
    required_token: () => void;
    shipper_location: (data: DataEvent["location_shipper"]) => void;
    pickup_order: (data: DataEvent["pickup_order"]) => void;
    status_order: (data: DataEvent["status_order"]) => void;
}

export interface ClientToServerEvents {
    cancelOrder: (data: DataOrder) => void;
    completeOrder: (data: DataOrder) => void;
    trackingOrder: (data: DataOrder) => void;
}

interface DataOrder {
    type: string;
    message: string;
    description: string;
}

export class SocketInstance {
    private static instance: Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor() {}

    public static getInstance(): Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { accessToken } = useToken();
        if (!SocketInstance.instance) {
            SocketInstance.instance = io(
                getServerSideProps().props.API_ROOT as string,
                {
                    auth: { token: accessToken },
                }
            );
        }
        return SocketInstance.instance;
    }
}
