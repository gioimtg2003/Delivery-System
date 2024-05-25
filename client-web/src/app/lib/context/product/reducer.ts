import { ProductAction, ProductActionType, ProductState } from "./type";

export const ReducerProduct = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ProductActionType.INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };
    case ProductActionType.SET_PRODUCT:
      return {
        ...state,
        items: action.payload?.items ?? null,
        total: action.payload?.total ?? 0,
        categories: action.payload?.categories ?? null,
        reload: false,
      };
    case ProductActionType.SEARCH_PRODUCT:
      return {
        ...state,
        search: action.payload?.search ?? null,
      };
    case ProductActionType.FILTER:
      return {
        ...state,
        filter: action.payload?.filter ?? null,
      };
    case ProductActionType.RELOAD:
      return {
        ...state,
        reload: !state.reload,
      };
    default:
      return state;
  }
};
