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

const initState: DriverState = {
  driver: undefined,
  online: false,
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
              online: false,
            },
          });
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show(
          'Có lỗi xảy ra vui lòng thử lại sau!',
          ToastAndroid.SHORT,
        );
      }
    })();
  }, []);

  const changeOnline = useCallback(async (online: boolean) => {
    try {
      let update = await (
        await axiosInstance()
      ).put('/shipper/status', {online});
      if (update.data.status === 'success') {
        dispatch({
          type: online
            ? DriverActionType.SET_ONLINE
            : DriverActionType.SET_OFFLINE,
          payload: {online},
        });
      } else {
        ToastAndroid.show(
          'Cập nhật trạng thái không thành công, vui lòng thử lại sau!',
          ToastAndroid.SHORT,
        );
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Có lỗi xảy ra vui lòng thử lại sau!',
        ToastAndroid.SHORT,
      );
    }
  }, []);

  return {state, changeOnline};
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
