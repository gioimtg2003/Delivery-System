import { Product } from "../../Types";

export type filterType = "category" | "revenue" | "price";

export type ProductState = {
  items: Product[] | null;
  total: number;
  search: string | null;
  filter: {
    type: filterType;
    value: string;
  } | null;
  categories: { Name: string; Id?: string; _id?: string }[] | null;
  isInitialized: boolean;
  reload: boolean;
};
export enum ProductActionType {
  INITIALIZE,
  SET_PRODUCT,
  SEARCH_PRODUCT,
  FILTER,
  RELOAD,
}

export interface ProductAction {
  type: ProductActionType;
  payload?: ProductState;
}
