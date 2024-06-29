import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {DriverAction, DriverActionType, DriverState} from './type';
import {DriverReducer} from './reducer';
import {axiosInstance} from '../../utils/axios';
import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import GetCurrentLocation from '../../utils/GetCurrentLocation';

const initState: DriverState = {
  driver: undefined,
  reloadProfile: false,
  showWarning: false,
};

const useDriverSource = () => {
  const [state, dispatch] = useReducer<Reducer<DriverState, DriverAction>>(
    DriverReducer,
    initState,
  );

  useEffect(() => {
    (async () => {
      try {
        let driver = await (await axiosInstance()).get('/shipper');
        if (driver.data.status === 'success') {
          console.log(driver.data.data);
          dispatch({
            type: DriverActionType.SET_DRIVER,
            payload: {
              driver: driver.data.data,
            },
          });
          dispatch({
            type: DriverActionType.SET_AUTH,
            payload: {
              isAuth: true,
            },
          });
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: DriverActionType.SET_AUTH,
          payload: {
            isAuth: false,
          },
        });
      }
    })();
  }, [state.reloadProfile]);

  useEffect(() => {
    (async () => {
      if (state.isAuth === true) {
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
  }, [state.isAuth, state.reloadHistoryWallet]);

  useEffect(() => {
    if (state.isAuth === true && state.driver?.OnlineStatus === 1) {
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
  }, [
    state.driver?.Status,
    state.driver?.OnlineStatus,
    state.isAuth,
    state.reloadOrderList,
  ]);

  const changeOnline = useCallback(async (online: boolean) => {
    console.log(online);
    try {
      let latitude: number = 0,
        longitude: number = 0;
      if (online === true) {
        let {latitude: a, longitude: b} = await GetCurrentLocation();
        latitude = a;
        longitude = b;
      }
      let update = await (
        await axiosInstance()
      ).put('/shipper/status', {online, latitude, longitude});
      if (update.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Cập nhật trạng thái thành công!',
          text1Style: {fontSize: 16, fontWeight: 'normal'},
        });
        dispatch({
          type: DriverActionType.RELOAD,
        });
      } else {
        ToastAndroid.show(
          'Cập nhật trạng thái không thành công, vui lòng thử lại sau!',
          ToastAndroid.SHORT,
        );
      }
    } catch (err: any) {
      console.log(err.response.data);
      if (err.response.data.message === 'driver_is_delivering') {
        ToastAndroid.show('Bạn đang có đơn hàng cần giao!', 5000);
      } else {
        ToastAndroid.show(
          'Có lỗi xảy ra vui lòng thử lại sau!',
          ToastAndroid.SHORT,
        );
      }
    }
  }, []);

  const reload = useCallback(() => {
    dispatch({
      type: DriverActionType.RELOAD,
    });
  }, []);

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
    changeOnline,
    reload,
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
