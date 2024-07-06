import {IOrder} from '../../../types/Order';
import {IWallet} from '../../../types/Wallet';

export interface DriverState {
  wallet?: IWallet[];
  orderList?: IOrder[];
  reloadHistoryWallet?: boolean;
  reloadOrderList?: boolean;
  warning?: {
    title: string;
    content: string;
  };
  showWarning?: boolean;
  orderPickup?: IOrder;
  isLoadOrderPickup?: boolean;
}

export enum DriverActionType {
  SET_HISTORY_WALLET,
  RELOAD_HISTORY_WALLET,
  SET_ORDER_LIST,
  RELOAD_ORDER_LIST,
  SET_WARNING,
  SHOW_WARNING,
  SET_ORDER_PICKUP,
  RELOAD_ORDER_PICKUP,
}

export interface DriverAction {
  type: DriverActionType;
  payload?: DriverState;
}
