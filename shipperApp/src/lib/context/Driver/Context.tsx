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

const initState: DriverState = {
  driver: undefined,
  isAuth: false,
  reload: false,
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
        Toast.show({
          type: 'error',
          text1: 'Đã xảy ra lỗi!',
          text2: 'Vui lòng đăng nhập lại!',
          text1Style: {fontSize: 16, fontWeight: 'normal'},
          text2Style: {fontSize: 14, fontWeight: 'normal'},
        });
      }
    })();
  }, [state.reload]);

  const changeOnline = useCallback(async (online: boolean) => {
    console.log(online);
    try {
      let update = await (
        await axiosInstance()
      ).put('/shipper/status', {online});
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
      ToastAndroid.show(
        'Có lỗi xảy ra vui lòng thử lại sau!',
        ToastAndroid.SHORT,
      );
    }
  }, []);

  const reload = useCallback(() => {
    dispatch({
      type: DriverActionType.RELOAD,
    });
  }, []);

  return {state, changeOnline, reload};
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
