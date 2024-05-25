import {
    Reducer,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { OrderReducer } from "./reducer";
import { OrderAction, OrderActionType, OrderState } from "./type";
import { getALlOrder } from "../../service/order";

const initState: OrderState = {
    items: [],
    isLoading: false,
    total: 0,
    isInitialized: false,
    filter: "All",
    page: 1,
    limit: 10,
};

const useOrderSource = () => {
    const [state, dispatch] = useReducer<Reducer<OrderState, OrderAction>>(
        OrderReducer,
        initState
    );

    useEffect(() => {
        // dispatch({ type: OrderActionType.INITIALIZE });

        (async () => {
            try {
                let items = await getALlOrder(
                    state.filter as string,
                    state.page,
                    state.limit
                );

                dispatch({
                    type: OrderActionType.SET_ORDER,
                    payload: {
                        items: items[0]["items"],
                        total: items[0]["total"][0]["total"] as number,
                        isLoading: false,
                        isInitialized: true,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [state.isLoading, state.filter, state.limit, state.page]);

    /**
     * This function is used to set the filter for the order
     */
    const setFIlter = useCallback((type: string) => {
        let filter: any = { filter: type };
        dispatch({
            type: OrderActionType.FILTER,
            payload: filter,
        });
    }, []);

    const setPage = useCallback((page: number) => {
        let value: any = { page: page };

        dispatch({
            type: OrderActionType.SET_PAGE,
            payload: value,
        });
    }, []);

    const setPageLimit = useCallback((limit: number) => {
        let value: any = { limit: limit };
        dispatch({
            type: OrderActionType.SET_LIMIT,
            payload: value,
        });
    }, []);

    const reload = useCallback(() => {
        dispatch({ type: OrderActionType.RELOAD });
    }, []);

    const sortItems = useCallback((sort: string) => {
        let value: any = { sort: sort };
        dispatch({
            type: OrderActionType.SORT,
            payload: value,
        });
    }, []);

    const OrderState = useMemo(() => {
        state.items?.sort((a, b): any => {
            if (state.sort === "asc") {
                return a.AmountTotal - b.AmountTotal;
            } else if (state.sort === "desc") {
                return b.AmountTotal - a.AmountTotal;
            }
        });
        // console.log(state.items);
        return state.items;
    }, [state.items, state.sort]);
    return { OrderState, setFIlter, reload, setPage, setPageLimit, sortItems };
};

type OrderContextType = ReturnType<typeof useOrderSource>;

const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <OrderContext.Provider value={useOrderSource()}>
            {children}
        </OrderContext.Provider>
    );
};
