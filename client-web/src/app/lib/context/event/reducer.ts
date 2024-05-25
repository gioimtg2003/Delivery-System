import { EventAction, EventState } from "./type";

export const reducer = (state: EventState, action: EventAction): EventState => {
    switch (action.type) {
        case "NOTIFICATION":
            return {
                ...state,
                notification: action.payload?.notification,
            };

        case "STATUS_SHIPPER":
            return {
                ...state,
                statusShipper: action.payload?.statusShipper,
            };

        case "LOCATION_SHIPPER":
            return {
                ...state,
                locationShipper: action.payload?.locationShipper,
            };
            
        default:
            return state;
    }
};
