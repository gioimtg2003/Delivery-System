import { useCallback, useContext, useEffect, useState } from "react";
import type { ShopUser } from "../Types";
import { axiosInstance } from "../util/axios";
import { UserContext } from "../context/UserContext";

export const useUserSource = () => {
  const [user, setUser] = useState<ShopUser>({} as ShopUser);
  const fetchData = useCallback((): Promise<ShopUser> => {
    console.log(`fetching user data...`);
    return new Promise((resolve, reject) => {
      axiosInstance()
        .get("/user/shop")
        .then((res) => {
          const userData: ShopUser = {
            ...res.data.data,
            Id: res.data.data._id,
          };
          resolve(userData);
        })
        .catch((error) => {
          reject(new Error("Failed to fetch user data"));
        });
    });
  }, []); //

  useEffect(() => {
    console.log(`useEffect user data...`);
    fetchData().then((data) => {
      setUser(data);
      console.log(data);
    });
  }, [setUser, fetchData]);
  return user;
};

export const useFetchUser = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    axiosInstance()
      .get(url)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => new Error("Failed to fetch user data"));
  }, [url]);
  return data;
};
