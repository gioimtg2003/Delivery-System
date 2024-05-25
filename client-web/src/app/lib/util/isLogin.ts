"use client";
import { useEffect, useState } from "react";
export function IsLogin(): boolean {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    let aT = localStorage.getItem("aT");
    let rT = localStorage.getItem("rT");
    let exp = localStorage.getItem("exp");
    if (aT && rT && exp) {
      let now = Date.now();
      if (now < Number(exp)) {
        setIsLogin(true);
      }
    }
  }, []);
  return isLogin;
}
