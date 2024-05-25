"use client";
import {
    Reducer,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { AuthAction, AuthActionType, AuthContextType, AuthState } from "./type";
import { reducerAuthHandler } from "./reducer";
import { axiosInstance } from "../../util/axios";

const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
};

const authContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

export const useAuth = () => {
    return useContext(authContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [stateAuth, dispatchAuth] = useReducer<
        Reducer<AuthState, AuthAction>
    >(reducerAuthHandler, initialState);
    const handleInitialize = useCallback(() => {
        dispatchAuth({
            type: AuthActionType.INITIALIZE,
            payload: {
                isAuthenticated: false,
                user: undefined,
                isLoading: false,
            },
        });
    }, []);

    useEffect(() => {
        (async () => {
            let access_token = localStorage.getItem("aT");
            let exp = localStorage.getItem("exp");
            if (!(access_token && exp)) {
                return handleInitialize();
            }
            try {
                let user = await axiosInstance().get("/customer");
                dispatchAuth({
                    type: AuthActionType.INITIALIZE,
                    payload: {
                        user: user.data.data,
                        isAuthenticated: true,
                        isLoading: false,
                    },
                });
            } catch {
                handleInitialize();
            }
        })();
    }, [handleInitialize, stateAuth.isLoading]);

    const valueAuth = useMemo(
        () => ({ ...stateAuth, dispatch: dispatchAuth }),
        [stateAuth, dispatchAuth]
    );
    return (
        <authContext.Provider value={valueAuth}>
            {children}
        </authContext.Provider>
    );
};
