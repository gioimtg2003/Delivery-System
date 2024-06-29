import { WalletAction, WalletActionType, WalletState } from "./type";

export const WalletReducer = (
    state: WalletState,
    action: WalletAction
): WalletState => {
    switch (action.type) {
        case WalletActionType.SET_WALLET:
            return {
                ...state,
                wallet: action.payload?.wallet,
            };
        case WalletActionType.RELOAD:
            return {
                ...state,
                reload: !state.reload,
            };

        case WalletActionType.SET_HISTORY_WALLET:
            return {
                ...state,
                historyWallet: action.payload?.historyWallet,
            };

        case WalletActionType.RELOAD_HISTORY_WALLET:
            return {
                ...state,
                reloadHistoryWallet: !state.reloadHistoryWallet,
            };
        default:
            return state;
    }
};
