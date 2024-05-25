import { AuthAction, AuthActionType, AuthState } from "./type";

export const reducerAuthHandler = (
    state: AuthState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                isAuthenticated: true,
                user: action.payload?.user ?? undefined,
            };

        case AuthActionType.LOGOUT:
            window.localStorage.clear();
            window.location.href = "/login";
            return {
                isAuthenticated: false,
                user: undefined,
            };

        case AuthActionType.INITIALIZE:
            return {
                isAuthenticated: action.payload?.isAuthenticated ?? false,
                user: action.payload?.user ?? undefined,
                isLoading: action.payload?.isLoading,
            };

        case AuthActionType.RELOAD:
            return {
                ...state,
                isLoading: !action.payload?.isLoading,
            };

        default:
            return state;
    }
};
