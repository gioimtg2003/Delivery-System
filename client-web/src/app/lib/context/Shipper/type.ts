import { IShipper } from "../../type/Shipper";

export interface ShipperState {
    shippers: IShipper[] | null;
    isLoading: boolean;
    isInitialized: boolean;
}

export enum ShipperActionType {
    INITIALIZE,
    RELOAD,
    SET_SHIPPER,
}

export interface ShipperAction {
    type: ShipperActionType;
    payload?: ShipperState;
}
