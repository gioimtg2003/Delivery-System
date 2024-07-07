import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {CustomerAction, CustomerActionType, CustomerState} from './type';
import {CustomerReducer} from './reducer';
import {axiosInstance} from '../utils/axios';
import {initSocket} from '../utils/socket';
import _BackgroundTimer from 'react-native-background-timer';
import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useAuth} from './auth.context';
const initState: CustomerState = {
  orderHistory: [],
};

const useCustomerSource = () => {
  const {isLoggedIn, jwt} = useAuth();
  const [state, dispatch] = useReducer<Reducer<CustomerState, CustomerAction>>(
    CustomerReducer,
    initState,
  );
  const socket = useMemo(() => initSocket(), []);

  useEffect(() => {
    console.log('Reload History');
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

  useEffect(() => {
    (async () => {
      console.log('Auth Socket');
      console.log(isLoggedIn);
      console.log(jwt);
      if (isLoggedIn === true && jwt !== null) {
        console.log('Auth Socket');
        socket.auth = {token: jwt};
        socket.connect();
        socket.on('invalidToken', async () => {
          console.log('Invalid Token');
          socket.auth = {token: jwt};
          socket.connect();
          console.log('Reconnect');
        });
        socket.on('connect', () => {
          console.log('Connected to socket');
          socket.on('pickedUpOrder', data => {
            if (Platform.OS === 'ios') {
              Alert.alert('Order Picked Up', `${data.data}`);
            } else {
              PushNotification.createChannel(
                {
                  channelId: 'order-picked-up',
                  channelName: 'Order Picked Up',
                },
                created => console.log(`createChannel returned '${created}'`),
              );
              PushNotification.localNotification({
                channelId: 'order-picked-up',
                title: 'Đơn hàng',
                message: `${data.data}`,
                largeIcon: 'assets_images_logo',
                bigLargeIcon: 'assets_images_logo',
              });
              dispatch({
                type: CustomerActionType.RELOAD_ORDER_HISTORY,
              });
            }
          });
        });
      }
    })();

    return () => {
      socket.off('invalidToken');
      socket.off('pickedUpOrder');
      socket.off('connect');
      socket.disconnect();
    };
  }, [isLoggedIn, socket, jwt]);

  useEffect(() => {
    if (isLoggedIn === true) {
      _BackgroundTimer.runBackgroundTimer(async () => {
        console.log('Ping');
        socket.emit('ping');
      }, 15000);
    } else {
      return;
    }

    return () => {
      _BackgroundTimer.stopBackgroundTimer();
    };
  }, [socket, isLoggedIn]);
  const ReLoadHistoryOrder = useCallback(() => {
    dispatch({
      type: CustomerActionType.RELOAD_ORDER_HISTORY,
    });
  }, []);

  return {state, ReLoadHistoryOrder, socket};
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
