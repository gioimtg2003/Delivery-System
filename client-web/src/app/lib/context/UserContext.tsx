import { createContext, useContext, useEffect, useMemo } from "react";
import { useFetchUser, useUserSource } from "../hook/user";
import { ShopUser } from "../Types";
import { useFetch } from "../hook/fetch";

export const UserContext = createContext<ReturnType<typeof useFetch<ShopUser>>>(
  {} as unknown as ReturnType<typeof useFetch<ShopUser>>
);

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const { data: user } = useFetch<ShopUser>("/user/shop");
  const value = useMemo(() => ({ data: user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
