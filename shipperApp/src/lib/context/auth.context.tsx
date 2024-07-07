import React, {useCallback, useEffect, useMemo} from 'react';
import {Axios, axiosInstance} from '../utils/axios';
import {setToken} from '../utils/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IDriver} from '../../types/Driver';
import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import GetCurrentLocation from '../utils/GetCurrentLocation';

export interface AuthState {
  isLoggedIn: boolean | null;
  jwt: string | null;
  driver: IDriver | null;
  reload: () => Promise<void>;
  onLogin: (credentials: {
    phone: string;
    password: string;
  }) => Promise<{status: 'success' | 'need_verify' | null}>;
  onLogout: () => Promise<void>;
  changeOnline: (online: boolean) => Promise<void>;
}
const AuthContext = React.createContext<AuthState>({
  isLoggedIn: false,
  driver: null,
  jwt: null,
  reload: () => Promise.resolve(),
  onLogin: () =>
    Promise.resolve({
      status: null,
    }),
  onLogout: () => Promise.resolve(),
  changeOnline: () => Promise.resolve(),
});

export const useAuth = () => {
  if (!React.useContext(AuthContext)) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return React.useContext(AuthContext);
};

export function AuthProvider({children}: {readonly children: React.ReactNode}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const [driver, setDriver] = React.useState<IDriver | null>(null);
  const [jwt, setJwt] = React.useState<string | null>(null);
  const reload = useCallback(async () => {
    try {
      let axios = await axiosInstance();
      let data = await axios.get('/shipper');
      if (data.data.status === 'success') {
        AsyncStorage.getItem('aT')
          .then(token => {
            setJwt(token);
            setDriver(data.data.data);
            setIsLoggedIn(true);
          })
          .catch(err => {
            setIsLoggedIn(false);
            console.log(err);
          });
      }
    } catch (error: any) {
      setIsLoggedIn(false);
    }
  }, []);

  const onLogin = useCallback(
    (credentials: {
      phone: string;
      password: string;
    }): Promise<{status: 'success' | 'need_verify'}> => {
      return new Promise((resolve, reject) => {
        new Axios()
          .getInstance()
          .post('/shipper/auth/sign-in', {
            phone: credentials.phone.trim(),
            password: credentials.password,
          })
          .then(res => {
            if (res.data.status === 'success') {
              console.log(res.data.data.data);
              if (res.data.data.data === 'need_verify') {
                resolve({status: 'need_verify'});
              } else {
                setToken({
                  accessToken: res.data.data.data.access_token,
                  refreshToken: res.data.data.data.refresh_token,
                  exp: res.data.data.data.exp,
                })
                  .then(() => {
                    setJwt(res.data.data.data.access_token);
                    setIsLoggedIn(true);
                    resolve({status: 'success'});
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    [],
  );
  const changeOnline = useCallback(
    async (online: boolean) => {
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
          reload();
          Toast.show({
            type: 'success',
            text1: 'Cập nhật trạng thái thành công!',
            text1Style: {fontSize: 16, fontWeight: 'normal'},
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
    },
    [reload],
  );

  const onLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    (async () => {
      reload();
    })();
  }, [reload]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      driver,
      jwt,
      reload,
      onLogin,
      onLogout,
      changeOnline,
    }),
    [isLoggedIn, driver, reload, onLogin, onLogout, jwt, changeOnline],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
