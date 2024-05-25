"use client";

import { Link, Links } from "@/app/ui/components/nav/Links";
import { createContext, useEffect, useMemo, useReducer } from "react";

type StateType = typeof Links;

export const enum ActionType {
    SELECT,
}

type ReducerAction = {
    type: ActionType;
    index: number;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case ActionType.SELECT:
            // console.log(`reducer selected page...`);
            state.map((link: Link, key: number) => {
                if (key === action.index) {
                    link.selected = true;
                } else {
                    link.selected = false;
                }
            });
            return [...state];

        default:
            return state;
    }
};

const initState = Links;

export const NavLinkContext = createContext(null as any);
export const NavLinkProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [stateLink, dispatchLink] = useReducer(reducer, initState);
    const NavLinkContextProviderValue = useMemo(
        () => ({ stateLink, dispatchLink }),
        [stateLink, dispatchLink]
    );

    return (
        <NavLinkContext.Provider value={NavLinkContextProviderValue}>
            {children}
        </NavLinkContext.Provider>
    );
};
