import {CustomerAction, CustomerActionType, CustomerState} from './type';

export const CustomerReducer = (
  state: CustomerState,
  action: CustomerAction,
) => {
  switch (action.type) {
    case CustomerActionType.RELOAD_ORDER_HISTORY:
      return {
        ...state,
        reloadHistory: !state.reloadHistory,
      };
    case CustomerActionType.SET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload?.orderHistory,
      };
    default:
      return state;
  }
};
