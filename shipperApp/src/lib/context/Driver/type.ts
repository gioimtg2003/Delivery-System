import {IDriver} from '../../../types/Driver';
import {IOrder} from '../../../types/Order';
import {IWallet} from '../../../types/Wallet';

export interface DriverState {
  driver?: IDriver;
  wallet?: IWallet[];
  orderList?: IOrder[];
  reloadProfile?: boolean;
  isAuth?: boolean;
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
  SET_DRIVER,
  SET_ONLINE,
  SET_OFFLINE,
  RELOAD,
  SET_AUTH,
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
