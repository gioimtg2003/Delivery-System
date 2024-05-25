import {
    Reducer,
    createContext,
    useCallback,
    useContext,
    useReducer,
} from "react";
import { Employee, EmployeeActionType, ReducerAction } from "../Types";
import { dateFormat } from "../util/dateFormat";
import { TbEye } from "react-icons/tb";
import Link from "next/link";

const initState = (): Employee[] => [];

const reducer = (
    state: Employee[],
    action: ReducerAction<EmployeeActionType, Employee[]>
): Employee[] => {
    switch (action.type) {
        case EmployeeActionType.GET_EMPLOYEE:
            return action.payload;

        case EmployeeActionType.ADD_EMPLOYEE:
            return [...state, ...action.payload];

        case EmployeeActionType.UPDATE_STATUS:
            // console.log("UPDATE_STATUS in StaffContext");
            console.log(action.payload);
            return state.map((item: Employee) => {
                if (item.Id === action.payload[0].Id) {
                    return {
                        ...item,
                        Status: action.payload[0].Online,
                    };
                }
                return item;
            });

        default:
            return state;
    }
};

const useStaffContext = (initState: Employee[]) => {
    const [state, dispatch] = useReducer<
        Reducer<Employee[], ReducerAction<EmployeeActionType, Employee[]>>
    >(reducer, initState);
    let GetEmployee = useCallback((employee: Employee[]) => {
        let staffTemp: any[] = [];
        employee?.map((item: any) => {
            staffTemp.push({
                Id: item._id,
                Name: item.Name,
                Phone: item.Phone,
                Email: item.Email,
                Address: item.Address,
                Position: item.Position,
                Status: item.Online ? "online" : "offline",
                //Note: client::::CreatedAt | Server::::item.CreateAt,
                CreatedAt: dateFormat(item.CreateAt),
                Details: (
                    <div className="w-full flex justify-center items-center  text-primary-2-color">
                        <Link href={`./employee/${item._id}`}>
                            <TbEye className="hover:cursor-pointer" />
                        </Link>
                    </div>
                ),
            });
        });
        // console.log(staffTemp);
        dispatch({ type: EmployeeActionType.GET_EMPLOYEE, payload: staffTemp });
    }, []);
    let UpdateStatus = useCallback((data: any) => {
        dispatch({
            type: EmployeeActionType.UPDATE_STATUS,
            payload: data,
        });
    }, []);
    return {
        state,
        GetEmployee,
        UpdateStatus,
    };
};

type StaffContextType = ReturnType<typeof useStaffContext>;

const initContextState: StaffContextType = {
    state: initState(),
    GetEmployee: (): void => {},
    UpdateStatus: (): void => {},
};

const StaffContext = createContext<StaffContextType>(initContextState);

export const useStaff = () => useContext(StaffContext);

export function StaffProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <StaffContext.Provider value={useStaffContext(initState())}>
            {children}
        </StaffContext.Provider>
    );
}
