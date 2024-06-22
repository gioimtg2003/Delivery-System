import {IDriver} from '../../../types/Driver';

export interface DriverState {
  driver?: IDriver;
  reload?: boolean;
  isAuth?: boolean;
}

export enum DriverActionType {
  SET_DRIVER,
  SET_ONLINE,
  SET_OFFLINE,
  RELOAD,
  SET_AUTH,
}

export interface DriverAction {
  type: DriverActionType;
  payload?: DriverState;
}
