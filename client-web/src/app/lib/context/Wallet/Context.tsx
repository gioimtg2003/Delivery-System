import React, {
    createContext,
    Reducer,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { WalletReducer } from "./reducer";
import { WalletAction, WalletActionType, WalletState } from "./type";
import { axiosInstance } from "../../util/axios";
import { message } from "antd";

const initState: WalletState = {
    wallet: undefined,
    reload: false,
    reloadHistoryWallet: false,
};

const useWalletSource = () => {
    const [state, dispatch] = useReducer<Reducer<WalletState, WalletAction>>(
        WalletReducer,
        initState
    );

    useEffect(() => {
        (async () => {
            try {
                let wallet = await axiosInstance().get("/admin/shipper/wallet");
                if (wallet.data.status === "success") {
                    dispatch({
                        type: WalletActionType.SET_WALLET,
                        payload: {
                            wallet: wallet.data.data,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                message.error("Có lỗi xảy ra");
            }
        })();
    }, [state.reload]);

    useEffect(() => {
        (async () => {
            try {
                let historyWallet = await axiosInstance().get(
                    "/admin/shipper/wallet/history"
                );
                if (historyWallet.data.status === "success") {
                    dispatch({
                        type: WalletActionType.SET_HISTORY_WALLET,
                        payload: {
                            historyWallet: historyWallet.data.data,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                message.error("Có lỗi xảy ra");
            }
        })();
    }, [state.reloadHistoryWallet]);

    const reload = useCallback(() => {
        dispatch({
            type: WalletActionType.RELOAD,
        });
    }, []);

    const reloadHistoryWallet = useCallback(() => {
        dispatch({
            type: WalletActionType.RELOAD_HISTORY_WALLET,
        });
    }, []);

    return { state, reload, reloadHistoryWallet };
};

type WalletContextType = ReturnType<typeof useWalletSource>;

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export const useWallet: () => WalletContextType = () => {
    if (!WalletContext) {
        throw new Error("useDriver must be used within a DriverProvider");
    }
    return useContext(WalletContext);
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <WalletContext.Provider value={useWalletSource()}>
            {children}
        </WalletContext.Provider>
    );
};
