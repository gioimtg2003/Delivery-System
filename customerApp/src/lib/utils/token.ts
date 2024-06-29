import AsyncStorage from '@react-native-async-storage/async-storage';

interface IToken {
  accessToken: string;
  refreshToken: string;
  exp: number;
}

const setToken = async (data: IToken) => {
  try {
    await AsyncStorage.setItem('aT', data.accessToken);
    await AsyncStorage.setItem('rT', data.refreshToken);
    await AsyncStorage.setItem('exp', data.exp.toString());
  } catch (e) {
    throw new Error(e as string);
  }
};

const getAT = async () => {
  try {
    let accessToken = await AsyncStorage.getItem('aT');
    let exp = await AsyncStorage.getItem('exp');
    return {accessToken, exp};
  } catch (e) {
    console.error(e);
  }
};

export {setToken, getAT};
