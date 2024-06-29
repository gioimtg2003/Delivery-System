import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {CustomerAction, CustomerActionType, CustomerState} from './type';
import {CustomerReducer} from './reducer';
import {axiosInstance} from '../utils/axios';

const initState: CustomerState = {
  Profile: undefined,
};

const useCustomerSource = () => {
  const [state, dispatch] = useReducer<Reducer<CustomerState, CustomerAction>>(
    CustomerReducer,
    initState,
  );
  useEffect(() => {
    (async () => {
      try {
        let customer = await (await axiosInstance()).get('/customer');
        if (customer.data.status === 'success') {
          dispatch({
            type: CustomerActionType.SET_ORDER_HISTORY,
            payload: {
              Profile: customer.data.data,
            },
          });
          dispatch({
            type: CustomerActionType.SET_AUTH,
            payload: {
              isAuth: true,
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: CustomerActionType.SET_AUTH,
          payload: {
            isAuth: false,
          },
        });
      }
    })();
  }, [state?.reloadProfile]);

  useEffect(() => {
    (async () => {
      try {
        let order = await (
          await axiosInstance()
        ).get('/customer/order-history');
        if (order.data.status === 'success') {
          dispatch({
            type: CustomerActionType.SET_ORDER_HISTORY,
            payload: {
              orderHistory: order.data.data,
            },
          });
        }
      } catch (error: any) {
        console.log(error.response.data);
      }
    })();
  }, [state?.reloadHistory]);

  const ReLoadHistoryOrder = useCallback(() => {
    dispatch({
      type: CustomerActionType.RELOAD_ORDER_HISTORY,
    });
  }, []);
  return {state, ReLoadHistoryOrder};
};

type CustomerContextType = ReturnType<typeof useCustomerSource>;
const CustomerContext = createContext<CustomerContextType>(
  {} as CustomerContextType,
);
export const useCustomer = () => {
  if (!CustomerContext) {
    throw new Error('Context Not Found');
  }
  return useContext(CustomerContext);
};

export const CustomerProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <CustomerContext.Provider value={useCustomerSource()}>
      {children}
    </CustomerContext.Provider>
  );
};
