"use client";
import { createContext } from "react";
import { message } from "antd";

export const MessageLoginContext: any = () => {
  const [messageApi, contextHolder] = message.useMessage();
  return createContext<any>([messageApi, contextHolder]);
};
