import {
  Reducer,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  ProductAction,
  ProductActionType,
  ProductState,
  filterType,
} from "./type";
import { ReducerProduct } from "./reducer";
import { axiosInstance } from "../../util/axios";

const initState: ProductState = {
  items: null,
  search: null,
  categories: null,
  isInitialized: false,
  reload: false,
  filter: null,
  total: 0,
};

function useProductSource() {
  const [state, dispatch] = useReducer<Reducer<ProductState, ProductAction>>(
    ReducerProduct,
    initState
  );

  useEffect(() => {
    axiosInstance()
      .get("/product")
      .then((res) => {
        dispatch({
          type: ProductActionType.SET_PRODUCT,
          payload: res.data.data,
        });
      });
  }, [state.reload]);

  const reload = useCallback(() => {
    dispatch({
      type: ProductActionType.RELOAD,
    });
  }, []);

  const setFilter = useCallback(
    (type: filterType, value: string) => {
      let payload: any = {
        filter: {
          type: type,
          value: value,
        },
      };

      dispatch({
        type: ProductActionType.FILTER,
        payload: payload,
      });
    },
    [state.filter]
  );

  const ProductState = useMemo(() => {
    if (state.filter?.type === "category" && state.filter?.value) {
      return state.items?.filter((item) =>
        item.CategoryId.includes(state.filter?.value ?? "")
      );
    } else if (state.filter?.type === "revenue") {
      return state.filter?.value === "MAX_TO_MIN"
        ? state.items?.sort((a, b) => b.Revenue - a.Revenue)
        : state.items?.sort((a, b) => a.Revenue - b.Revenue);
    } else if (state.filter?.type === "price") {
      return state.filter?.value === "MAX_TO_MIN"
        ? state.items?.sort((a, b) => b.Price - a.Price)
        : state.items?.sort((a, b) => a.Price - b.Price);
    }

    return state.items;
  }, [state.items, state.filter]);

  return { ProductState, setFilter, Categories: state.categories, reload };
}

type ProductContextType = ReturnType<typeof useProductSource>;

const ProductContext = createContext<ProductContextType>(
  {} as any as ProductContextType
);

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProductContext.Provider value={useProductSource()}>
      {children}
    </ProductContext.Provider>
  );
};
