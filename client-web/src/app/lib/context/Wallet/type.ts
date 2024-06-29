import { IWallet } from "../../type/Wallet";

export interface WalletState {
    historyWallet?: IWallet[];
    wallet?: IWallet[];
    reload?: boolean;
    isAuth?: boolean;
    reloadHistoryWallet?: boolean;
}

export enum WalletActionType {
    SET_WALLET,
    SET_HISTORY_WALLET,
    RELOAD,
    RELOAD_HISTORY_WALLET,
}

export interface WalletAction {
    type: WalletActionType;
    payload?: WalletState;
}
