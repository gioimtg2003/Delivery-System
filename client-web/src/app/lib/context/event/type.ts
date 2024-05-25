export interface EventState {
    notification?: {
        type: string;
        message: string;
        description: string;
    };
    statusShipper?: {
        id: string;
        status: string;
        message: string;
        Online: boolean;
    };
    locationShipper?: {
        id: string;
        lat: number;
        lng: number;
    };
}

export enum EventActionType {
    NOTIFICATION = "NOTIFICATION",
    STATUS_SHIPPER = "STATUS_SHIPPER",
    LOCATION_SHIPPER = "LOCATION_SHIPPER",
}

export interface EventAction {
    type: EventActionType;
    payload?: EventState;
}
