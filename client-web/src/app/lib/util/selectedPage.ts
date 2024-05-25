"use client";
import { ActionType } from "@/app/lib/context/LinkContext";

export const selectedPage = (dispatchLink: any, key: number): void => {
  dispatchLink({ type: ActionType.SELECT, index: key });
};
