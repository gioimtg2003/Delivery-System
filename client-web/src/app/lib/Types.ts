export interface User {
    Name: string;
    Email: string;
    Phone: string;
    Address: string;
}

export interface Employee extends User {
    Id: string;
    Position: string;
    income?: number | 0;
    Online?: boolean;
    CreatedAt: string;
}

export interface OptionsDatagridView {
    gridType: string;
    row?: {
        /**
         * Height of row
         * 14-16-20-24
         */
        height?: number;
        max?: number;
    };
    pagination?: {
        pageSize: number;
    };
    style?: {
        header?: {
            textHeaderColor?: string;
            bgColor?: string;
            height?: number;
        };
        column?: {
            width?: boolean;
        };
    };
    borderRadius?: number;
}

export interface AddEmployeeFieldType {
    firstName: string;
    lastName: string;
    position: string;
    Phone: string;
    Email: string;
    Address: string;
}
export interface AddProductFieldType {
    Name: string;
    Price: number;
    Stock: number;
    Category: string;
    Image: any;
}

export interface ShopUser extends User {
    _id?: string;
    Id: string;
    ShopName: string;
    ShopAddress: string;
}

export interface DatagridViewColumn {
    title: string;
    dataIndex: string;
    key: string;
    style?: {
        width?: string;
    };
}

export interface ResponseSuccess {
    code: number;
    status: string;
    message: string;
    data: any;
}
export interface ResponseError {
    code: number;
    message: string;
}
/**
 * Type of login state
 */
export interface ILogin {
    isLogin: boolean;
}

export enum LoginActionType {
    LOGOUT,
}
/**
 * Type of  action
 */
export type ReducerAction<T, V> = {
    type: T;
    payload: V;
};

export enum EmployeeActionType {
    GET_EMPLOYEE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_STATUS,
}

export enum UserActionType {
    GET_PROFILE,
    UPDATE_PROFILE,
    UPDATE_PASSWORD,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
    DELETE_PRODUCT,
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_ORDER,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORY,
}

export interface Product {
    Id?: string;
    _id: string;
    Name: any;
    Price: number;
    Stock: number;
    Description: string;
    Category: string;
    CategoryId: string;
    ImageUrl: string;
    createdAt: string;
    Revenue: number;
}

export type CreateOrderType = {
    ProductId: string;
    Quantity: number;
    Name: string;
    Phone: string;
    Address: string;
    ShippingAmount: number;
    ReducedAmount: number;
    PaymentMethod: string;
    Price: number;
    TotalAmount: number;
    Description: string;
};
