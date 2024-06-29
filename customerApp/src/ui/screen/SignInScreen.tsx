import React, {useCallback, useState} from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../lib/constant/color';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../components/Loading';
import {Axios} from '../../lib/utils/axios';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {formatPhoneNumber} from '../../lib/utils/fornatPhoneNumber';
import {setToken} from '../../lib/utils/token';

interface IFocus {
  phone?: boolean;
  password?: boolean;
}
const ImgBg = require('../../../assets/images/backgroundLogin.png');

const SignInScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [focus, setFocus] = useState<IFocus>({
    phone: false,
    password: false,
  });
  const handleLogin = useCallback(() => {
    setLoading(true);
    if (!phone || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    new Axios()
      .getInstance()
      .post('/customer/auth/sign-in', {
        phone: '84' + phone.replace(/ /g, ''),
        password,
      })
      .then(res => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          if (res.data.data.data === 'need_verify') {
            new Axios()
              .getInstance()
              .post('/customer/auth/resend-otp', {
                Phone: '84' + phone.replace(/ /g, ''),
              })
              .then(res => {
                if (res.data.code === 200) {
                  navigation.navigate('otp-screen', {phone});
                }
              })
              .catch(err => {
                console.log(err?.response);
                ToastAndroid.show(
                  err?.response?.data.message,
                  ToastAndroid.SHORT,
                );
              });
          } else {
            console.log('Data from server:');
            console.log(res.data.data.data);
            setToken({
              accessToken: res.data.data.data.access_token,
              refreshToken: res.data.data.data.refresh_token,
              exp: res.data.data.data.exp,
            })
              .then(() => {
                navigation.navigate('home');
              })
              .catch(err => {
                console.log(err);
                ToastAndroid.show('Lỗi setToken', ToastAndroid.SHORT);
              });
          }
        }
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      })
      .catch((err: any) => {
        console.log(err.response.data);
        if (err?.response?.data.message === 'account_not_found') {
          ToastAndroid.show('Tài khoản không tồn tại', ToastAndroid.SHORT);
        } else if (err?.response?.data.message === 'password_is_incorrect') {
          ToastAndroid.show('Mật khẩu không đúng', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Lỗi Khi SignIn', ToastAndroid.SHORT);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [phone, password, setLoading, navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground source={ImgBg} resizeMode="cover" style={styles.imgBg}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.footer}>
            <View
              style={{
                flex: 6,
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={[
                  styles.container_phone,
                  {
                    borderColor: focus.phone ? colors.placeholder : '#ddd',
                  },
                ]}>
                <Text style={{color: 'black', fontSize: 15}}>+84</Text>
                <TextInput
                  onFocus={() => {
                    setFocus({...focus, phone: true});
                  }}
                  style={styles.inputPhone}
                  placeholder="Số điện thoại"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={e => setPhone(formatPhoneNumber(e))}
                  placeholderTextColor={'#aaa'}
                  onBlur={() => {
                    setFocus({...focus, phone: false});
                  }}
                  maxLength={11}
                />
              </View>
              <View
                style={[
                  styles.container_password,
                  {
                    borderBottomColor: focus.password
                      ? colors.placeholder
                      : '#ddd',
                  },
                ]}>
                <TextInput
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.password}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                  onFocus={() => {
                    setFocus({...focus, password: true});
                  }}
                  onBlur={() => {
                    setFocus({...focus, password: false});
                  }}
                />
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  onPress={toggleShowPassword}
                  style={{marginLeft: 10}}
                  color={'#aaa'}
                />
              </View>
            </View>
            <View
              style={{
                flex: 4,
                width: '100%',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!phone || !password}
                onPress={handleLogin}
                style={{
                  backgroundColor: phone && password ? '#3ABEF9' : '#ccc',
                  width: '80%',
                  borderRadius: 7,
                  paddingVertical: 10,
                  alignItems: 'center',
                  height: 45,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableHighlight
                underlayColor={colors.bgInput}
                onPress={() => {
                  navigation.navigate('sign-up');
                }}
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  marginTop: 10,
                  borderRadius: 7,
                  paddingVertical: 10,
                  alignItems: 'center',
                  height: 45,
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#3ABEF9',
                }}>
                <Text style={{color: '#3ABEF9', fontSize: 16}}>
                  Tạo tài khoản
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </KeyboardAvoidingView>
        {loading && <Loading />}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputPhone: {
    fontSize: 15,
    marginLeft: 2,
    color: 'black',
  },
  container_phone: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imgBg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  password: {
    flex: 1,
    color: '#000000',
    paddingRight: 10,
    fontSize: 16,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container_password: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginHorizontal: '7%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flex: 6,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    zIndex: 10,
  },
});

export default SignInScreen;
