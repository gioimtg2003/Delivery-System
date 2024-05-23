import { Driver as IDriver } from "./Driver";
import { Customer as ICustomer } from "./Customer";
import { Employee as IEmployee } from "./Employee";
import {
    Order as IOrder,
    method_pickup,
    payer,
    status_delivery,
    status_order,
    order_method,
} from "./Order";
import { PostOffice as IPostOffice } from "./PostOffice";
import { Log as ILog } from "./Log";
import { IConnect } from "./Connect";
declare namespace e {
    interface IDriverSchema extends IDriver {}
    interface ICustomerSchema extends ICustomer {}
    interface IEmployeeSchema extends IEmployee {}
    interface IOrderSchema extends IOrder {}
    interface IPostOfficeSchema extends IPostOffice {}
    interface ILogSchema extends ILog {}
    interface Connect extends IConnect {}
    type payer_type = payer;
    type method_pickup_type = method_pickup;
    type status_order_type = status_order;
    type status_delivery_type = status_delivery;
    type order_type = order_method;
}

export = e;
