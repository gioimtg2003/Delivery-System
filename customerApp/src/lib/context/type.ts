import {ICustomer} from '../types/Customer';
import {IOrder} from '../types/Order';

export interface CustomerState {
  Profile?: ICustomer;
  reloadProfile?: boolean;
  isAuth?: boolean;
  orderHistory?: IOrder[];
  reloadHistory?: boolean;
}

export enum CustomerActionType {
  SET_PROFILE,
  RELOAD_PROFILE,
  SET_AUTH,
  SET_ORDER_HISTORY,
  RELOAD_ORDER_HISTORY,
}

export interface CustomerAction {
  type: CustomerActionType;
  payload?: CustomerState;
}
