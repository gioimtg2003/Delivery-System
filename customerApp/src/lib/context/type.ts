import {IOrder} from '../types/Order';

export interface CustomerState {
  orderHistory?: IOrder[];
  reloadHistory?: boolean;
}

export enum CustomerActionType {
  SET_ORDER_HISTORY,
  RELOAD_ORDER_HISTORY,
}

export interface CustomerAction {
  type: CustomerActionType;
  payload?: CustomerState;
}
