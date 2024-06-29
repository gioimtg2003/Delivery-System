import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from './token';

export class Axios {
  getInstance(file?: boolean): AxiosInstance {
    return axios.create({
      baseURL: 'http://192.168.1.75:3000/api',
      timeout: 20000,
      headers: {
        'Content-Type': file ? 'multipart/form-data' : 'application/json',
      },
    });
  }
}

export const axiosInstance = async (file?: boolean): Promise<AxiosInstance> => {
  let axiosInit = new Axios().getInstance(file ?? false);
  axiosInit.interceptors.request.use(async config => {
    try {
      let accessToken = await AsyncStorage.getItem('aT'); // update token
      let exp = await AsyncStorage.getItem('exp');
      if (accessToken && exp) {
        config.headers.Authorization = `Bearer ${
          Number(exp) > Date.now() ? accessToken : await grantAccessToken()
        }`;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error in request interceptor');
    }

    return {...config};
  });

  return axiosInit;
};

export const grantAccessToken = async () => {
  try {
    let refreshToken = await AsyncStorage.getItem('rT');
    let data = await new Axios().getInstance(false).post('/auth/token', {
      token: refreshToken,
    });
    setToken({
      accessToken: data.data.data.access_token,
      refreshToken: data.data.data.refresh_token,
      exp: data.data.data.exp,
    });

    return data.data.data.access_token;
  } catch (error) {
    // Logout
    console.log(error);
    throw new Error('Refresh token failed');
  }
};
