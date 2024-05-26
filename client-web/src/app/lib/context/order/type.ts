export interface Order {
  Customer: string;
  ProductName: string;
  OrderDate: string;
  AmountTotal: number;
  Status: string;
  PaymentMethod: string;
  _id: string;
}

export type filterType = "status" | "amount";

export interface OrderState {
  items: Order[] | null;
  isLoading: boolean;
  total: number;
  isInitialized: boolean;
  filter?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export enum OrderActionType {
  INITIALIZE,
  SET_ORDER,
  SET_TOTAL,
  FILTER,
  RELOAD,
  SET_PAGE,
  SET_LIMIT,
  SORT,
}

export interface OrderAction {
  type: OrderActionType;
  payload?: OrderState;
}
