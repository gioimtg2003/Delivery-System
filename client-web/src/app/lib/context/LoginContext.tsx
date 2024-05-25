"use client";
import { createContext, useMemo, useReducer } from "react";
import { LoginActionType, type ILogin, type ReducerAction } from "../Types";
import { useRouter } from "next/navigation";

const initState: ILogin = {
  isLogin: false,
};

export const LoginContext = createContext(null as any);
/**
 * Dispatch Login chua lam
 * @param param0
 * @returns
 */
export function LoginProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const router = useRouter();

  const reducer = (
    state: ILogin,
    action: ReducerAction<LoginActionType, ILogin>
  ): ILogin => {
    switch (action.type) {
      case LoginActionType.LOGOUT:
        localStorage.clear();
        router.push("/login");
        return { ...state, isLogin: false };
      default:
        throw new Error("Action not found");
    }
  };

  const [stateLogin, dispatchLogin] = useReducer(reducer, initState);

  const LoginContextProviderValue = useMemo(
    () => ({ stateLogin, dispatchLogin }),
    [stateLogin, dispatchLogin]
  );

  return (
    <LoginContext.Provider value={LoginContextProviderValue}>
      {children}
    </LoginContext.Provider>
  );
}
