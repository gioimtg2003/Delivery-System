import { useEffect, useState } from "react";
import { axiosInstance } from "../util/axios";

export const useFetch = <T>(
  url: string,
  body?: object | undefined,
  reload?: boolean | null
) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    axiosInstance()
      .get(url, body ?? {})
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => new Error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload]);
  return { data };
};
