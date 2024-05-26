import { Reducer, createContext, useMemo, useReducer } from "react";
import { reducer } from "./reducer";
import { EventAction, EventState } from "./type";

const initEventState: EventState = {};

export const EventContext = createContext<{
    state: EventState;
    dispatch: React.Dispatch<EventAction>;
}>({ state: initEventState, dispatch: () => null });

export default function EventProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [state, dispatch] = useReducer<Reducer<EventState, EventAction>>(
        reducer,
        initEventState
    );

    const value = useMemo(() => ({ state, dispatch }), [state]);
    return (
        <EventContext.Provider value={value}>{children}</EventContext.Provider>
    );
}
