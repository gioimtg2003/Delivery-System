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
        reloadProfile: !state.reloadProfile,
      };
    case DriverActionType.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload?.isAuth,
      };

    case DriverActionType.SET_HISTORY_WALLET:
      return {
        ...state,
        wallet: action.payload?.wallet,
      };

    case DriverActionType.RELOAD_HISTORY_WALLET:
      return {
        ...state,
        reloadHistoryWallet: !state.reloadHistoryWallet,
      };
    case DriverActionType.SET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload?.orderList,
      };
    case DriverActionType.RELOAD_ORDER_LIST:
      return {
        ...state,
        reloadOrderList: !state.reloadOrderList,
      };
    case DriverActionType.SET_WARNING:
      return {
        ...state,
        warning: action.payload?.warning,
      };
    case DriverActionType.SHOW_WARNING:
      return {
        ...state,
        showWarning: action.payload?.showWarning,
      };
    default:
      return state;
  }
};
