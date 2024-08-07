import {DriverAction, DriverActionType, DriverState} from './type';

export const DriverReducer = (
  state: DriverState,
  action: DriverAction,
): DriverState => {
  switch (action.type) {
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
    case DriverActionType.SET_ORDER_PICKUP:
      return {
        ...state,
        orderPickup: action.payload?.orderPickup,
      };
    case DriverActionType.RELOAD_ORDER_PICKUP:
      return {
        ...state,
        isLoadOrderPickup: !state.isLoadOrderPickup,
      };
    default:
      return state;
  }
};
