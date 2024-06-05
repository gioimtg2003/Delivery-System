import { ShipperAction, ShipperActionType, ShipperState } from "./type";

export const ShipperReducer = (
    state: ShipperState,
    action: ShipperAction
): ShipperState => {
    switch (action.type) {
        case ShipperActionType.INITIALIZE:
            return {
                ...state,
                isInitialized: true,
            };

        case ShipperActionType.SET_SHIPPER:
            return {
                ...state,
                shippers: action.payload?.shippers ?? [],
            };

        case ShipperActionType.RELOAD:
            return {
                ...state,
                isLoading: !state.isLoading,
            };

        default:
            return state;
    }
};
