import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {DriverAction, DriverActionType, DriverState} from './type';
import {DriverReducer} from './reducer';
import {axiosInstance} from '../../utils/axios';
import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import {useAuth} from '../auth.context';
import {initSocket} from '../../utils/socket';
import GetCurrentLocation from '../../utils/GetCurrentLocation';
import HashPermissionLocation from '../../utils/HashPermissionLocataion';

const initState: DriverState = {
  showWarning: false,
};

const useDriverSource = () => {
  const [state, dispatch] = useReducer<Reducer<DriverState, DriverAction>>(
    DriverReducer,
    initState,
  );
  const {isLoggedIn, driver, jwt} = useAuth();
  const socket = useMemo(() => initSocket(), []);
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
        });
      }
    })();

    return () => {
      socket.off('connect');
      socket.off('invalidToken');
    };
  }, [isLoggedIn, socket, jwt]);

  useEffect(() => {
    (async () => {
      if (isLoggedIn === true) {
        try {
          let historyWallet = await (
            await axiosInstance()
          ).get('/shipper/wallet');
          if (historyWallet.data.status === 'success') {
            dispatch({
              type: DriverActionType.SET_HISTORY_WALLET,
              payload: {
                wallet: historyWallet.data.data,
              },
            });
          }
        } catch (err: any) {
          console.error(err.response.data.mesage);
        }
      }
    })();
  }, [isLoggedIn, state.reloadHistoryWallet]);

  useEffect(() => {
    // if (isLoggedIn === true) {
    //   let intervalId = _BackgroundTimer.setInterval(async () => {
    //     try {
    //       const hashPermission = await HashPermissionLocation();
    //       if (hashPermission === true) {
    //         // const {latitude, longitude} = await GetCurrentLocation();
    //         // let data = {
    //         //   transport: String(driver?.idTransport),
    //         //   orderId: String(driver?.idOrder),
    //         //   lat: latitude,
    //         //   lng: longitude,
    //         // };
    //         // socket.emit('TrackingOrder', data);
    //       }
    //     } catch (err: any) {
    //       console.error(err);
    //     }
    //   }, 10000);
    //   return () => {
    //     _BackgroundTimer.clearInterval(intervalId);
    //   };
    // } else {
    //   return;
    // }
  }, [socket, isLoggedIn, driver?.idTransport, driver?.idOrder]);

  useEffect(() => {
    if (isLoggedIn === true && driver?.OnlineStatus === 1) {
      (async () => {
        try {
          let data = await (await axiosInstance()).get('/shipper/order');
          if (data.data.status === 'success') {
            console.log(data.data.data);
            dispatch({
              type: DriverActionType.SET_ORDER_LIST,
              payload: {
                orderList: data.data.data,
              },
            });
          }
        } catch (err: any) {
          console.error(err.response.data.message);
          Toast.show({
            type: 'error',
            text1: 'Có lỗi xảy ra khi lấy danh sách đơn hàng',
            text1Style: {fontSize: 15, fontWeight: 'normal'},
          });
        }
      })();
    }
  }, [state.reloadOrderList, isLoggedIn, driver]);

  useEffect(() => {
    if (
      isLoggedIn === true &&
      driver?.OnlineStatus === 1 &&
      driver?.Status === 'Delivering' &&
      driver?.idOrder !== null
    ) {
      const interval = setInterval(async () => {
        try {
          const hashPermission = await HashPermissionLocation();
          if (hashPermission === true) {
            const {latitude, longitude} = await GetCurrentLocation();
            let data = {
              transport: String(driver.idTransport),
              orderId: String(driver.idOrder),
              lat: latitude,
              lng: longitude,
            };
            socket.emit('TrackingOrder', data);
          }
        } catch (err: any) {
          console.error(err);
        }
      }, 7000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [
    driver?.idTransport,
    driver?.OnlineStatus,
    driver?.Status,
    driver?.idOrder,
    isLoggedIn,
    socket,
  ]);
  const reloadHistoryWallet = useCallback(() => {
    dispatch({
      type: DriverActionType.RELOAD_HISTORY_WALLET,
    });
  }, []);

  const reloadOrderList = useCallback(() => {
    dispatch({
      type: DriverActionType.RELOAD_ORDER_LIST,
    });
  }, []);

  const showWarning = useCallback((title: string, content: string) => {
    dispatch({
      type: DriverActionType.SET_WARNING,
      payload: {
        warning: {
          title,
          content,
        },
      },
    });
    dispatch({
      type: DriverActionType.SHOW_WARNING,
      payload: {
        showWarning: true,
      },
    });
  }, []);

  const hideWarning = useCallback(() => {
    dispatch({
      type: DriverActionType.SHOW_WARNING,
      payload: {
        showWarning: false,
      },
    });
  }, []);

  const getOrderPickup = useCallback(async () => {
    try {
      let order = await (await axiosInstance()).get('/shipper/order/pickup');
      if (order.data.status === 'success') {
        dispatch({
          type: DriverActionType.SET_ORDER_PICKUP,
          payload: {
            orderPickup: order.data.data,
          },
        });
      }
    } catch (err: any) {
      console.error(err.response.data);
      ToastAndroid.show(
        'Có lỗi xảy ra khi lấy thông tin đơn hàng!',
        ToastAndroid.SHORT,
      );
    }
  }, []);

  return {
    state,
    socket,
    reloadHistoryWallet,
    reloadOrderList,
    showWarning,
    hideWarning,
    getOrderPickup,
  };
};

type DriverContextType = ReturnType<typeof useDriverSource>;

const DriverContext = createContext<DriverContextType>({} as DriverContextType);

export const useDriver = () => {
  if (!DriverContext) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return useContext(DriverContext);
};

export const DriverProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <DriverContext.Provider value={useDriverSource()}>
      {children}
    </DriverContext.Provider>
  );
};
