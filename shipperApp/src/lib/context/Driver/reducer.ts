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
    case DriverActionType.RELOAD:
      return {
        ...state,
        reload: !state.reload,
      };
    case DriverActionType.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload?.isAuth,
      };

    default:
      return state;
  }
};
