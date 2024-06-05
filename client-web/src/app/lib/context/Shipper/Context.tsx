import {
    Reducer,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { ShipperReducer } from "./reducer";
import { ShipperAction, ShipperActionType, ShipperState } from "./type";
import ListShipperService from "../../service/Shipper/ListShipper";

const initState: ShipperState = {
    shippers: [],
    isLoading: false,
    isInitialized: false,
};

const useShipperSource = () => {
    const [state, dispatch] = useReducer<Reducer<ShipperState, ShipperAction>>(
        ShipperReducer,
        initState
    );

    useEffect(() => {
        (async () => {
            try {
                const shippers = await ListShipperService();
                dispatch({
                    type: ShipperActionType.SET_SHIPPER,
                    payload: {
                        shippers: shippers,
                        isLoading: false,
                        isInitialized: true,
                    },
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [state.isLoading]);

    const reload = useCallback(() => {
        dispatch({ type: ShipperActionType.RELOAD });
    }, []);

    return { state, reload };
};

type ShipperContextType = ReturnType<typeof useShipperSource>;

const ShipperContext = createContext<ShipperContextType>(
    {} as ShipperContextType
);

export const useShipper = () => useContext(ShipperContext);

export const ShipperProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ShipperContext.Provider value={useShipperSource()}>
            {children}
        </ShipperContext.Provider>
    );
};
