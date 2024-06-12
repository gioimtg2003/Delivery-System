import {IDriver} from '../../../types/Driver';

export interface DriverState {
  driver?: IDriver;
  online: boolean;
}

export enum DriverActionType {
  SET_DRIVER,
  SET_ONLINE,
  SET_OFFLINE,
}

export interface DriverAction {
  type: DriverActionType;
  payload?: DriverState;
}
