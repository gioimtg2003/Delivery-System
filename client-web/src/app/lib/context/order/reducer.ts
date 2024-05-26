import { OrderAction, OrderActionType, OrderState } from "./type";

export const OrderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case OrderActionType.INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };

    case OrderActionType.SET_ORDER:
      return {
        ...state,
        items: action.payload?.items ?? [],
        total: action.payload?.total ?? 0,
      };

    case OrderActionType.SET_TOTAL:
      return {
        ...state,
        total: action.payload?.total ?? 0,
      };

    case OrderActionType.FILTER:
      return {
        ...state,
        filter: action.payload?.filter ?? undefined,
      };

    case OrderActionType.RELOAD:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case OrderActionType.SET_PAGE:
      return {
        ...state,
        page: action.payload?.page ?? 0,
      };

    case OrderActionType.SET_LIMIT:
      return {
        ...state,
        limit: action.payload?.limit ?? 10,
      };

    case OrderActionType.SORT:
      return {
        ...state,
        sort: action.payload?.sort ?? "asc",
      };

    default:
      return state;
  }
};
