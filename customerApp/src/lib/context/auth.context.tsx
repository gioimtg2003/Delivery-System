import React, {useCallback, useEffect, useMemo} from 'react';
import {ICustomer} from '../types/Customer';
import {Axios, axiosInstance} from '../utils/axios';
import {setToken} from '../utils/token';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  isLoggedIn: boolean | null;
  jwt: string | null;
  customer: ICustomer | null;
  reload: () => Promise<void>;
  onLogin: (credentials: {
    phone: string;
    password: string;
  }) => Promise<{status: 'success' | 'need_verify' | null}>;
  onLogout: () => Promise<void>;
}
const AuthContext = React.createContext<AuthState>({
  isLoggedIn: false,
  customer: null,
  jwt: null,
  reload: () => Promise.resolve(),
  onLogin: () =>
    Promise.resolve({
      status: null,
    }),
  onLogout: () => Promise.resolve(),
});

export const useAuth = () => {
  if (!React.useContext(AuthContext)) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return React.useContext(AuthContext);
};

export function AuthProvider({children}: {readonly children: React.ReactNode}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const [customer, setCustomer] = React.useState<ICustomer | null>(null);
  const [jwt, setJwt] = React.useState<string | null>(null);
  const reload = useCallback(async () => {
    try {
      let axios = await axiosInstance();
      let data = await axios.get('/customer');
      if (data.data.status === 'success') {
        AsyncStorage.getItem('aT')
          .then(token => {
            setJwt(token);
            setCustomer(data.data.data);
            setIsLoggedIn(true);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error: any) {
      console.error(error);
      console.log('Not Auth');
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
          .post('/customer/auth/sign-in', {
            phone: '84' + credentials.phone.replace(/ /g, ''),
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
      customer,
      jwt,
      reload,
      onLogin,
      onLogout,
    }),
    [isLoggedIn, customer, reload, onLogin, onLogout, jwt],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
