import {DriverAction, DriverActionType, DriverState} from './type';

export const DriverReducer = (
  state: DriverState,
  action: DriverAction,
): DriverState => {
  switch (action.type) {
    case DriverActionType.SET_DRIVER:
      return {
        ...state,
        driver: action.payload?.driver,
      };

    case DriverActionType.SET_ONLINE:
      return {
        ...state,
        online: true,
      };

    case DriverActionType.SET_OFFLINE:
      return {
        ...state,
        online: false,
      };

    default:
      return state;
  }
};
