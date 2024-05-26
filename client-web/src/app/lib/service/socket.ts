"use client";
import { Socket, io } from "socket.io-client";

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
}

export interface ServerToClientEvents {
    NotificationOrder: (data: DataOrder) => void;
    shipper_status: (data: DataEvent["status_shipper"]) => void;
    required_token: () => void;
    shipper_location: (data: DataEvent["location_shipper"]) => void;
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
