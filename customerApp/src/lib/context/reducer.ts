import {CustomerAction, CustomerActionType, CustomerState} from './type';

export const CustomerReducer = (
  state: CustomerState,
  action: CustomerAction,
) => {
  switch (action.type) {
    case CustomerActionType.SET_PROFILE:
      return {
        ...state,
        Profile: action.payload?.Profile,
      };
    case CustomerActionType.RELOAD_PROFILE:
      return {
        ...state,
        reloadProfile: !action.payload?.reloadProfile,
      };
    case CustomerActionType.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload?.isAuth,
      };
    case CustomerActionType.RELOAD_ORDER_HISTORY:
      return {
        ...state,
        reloadHistory: !action.payload?.reloadHistory,
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
