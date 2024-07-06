import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationProp} from '@react-navigation/native';
import Loading from '../component/Loading';
import {useAuth} from '../../lib/context/auth.context';
import {AppScreenParamList} from '../../types/ScreenParam';
const SignInScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {onLogin, reload} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormatPhone, setIsFormatPhone] = useState<boolean>(false);
  const handleSigIn = () => {
    if (isFormatPhone) {
      ToastAndroid.show('Số điện thoại không đúng', ToastAndroid.SHORT);
      return;
    } else if (!phone) {
      ToastAndroid.show('Vui lòng nhập số điện thoại', ToastAndroid.SHORT);
      return;
    } else if (!password) {
      ToastAndroid.show('Vui lòng nhập mật khẩu', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    onLogin({phone, password})
      .then(res => {
        if (res.status === 'success') {
          setTimeout(() => {
            setLoading(false);
            reload();
            navigation.reset({
              index: 0,
              routes: [{name: 'home'}],
            });
          }, 1000);
        }
      })
      .catch(err => {
        if (err.response.data.message === 'need_upload_identity') {
          Alert.alert(
            'Thông báo',
            'Bạn chưa tải lên thông tin cá nhân. Vui lòng bấm tiếp tục để tải lên hình ảnh thông tin cá nhân.',
            [
              {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Tiếp tục',
                onPress: () => {
                  navigation.navigate('identity', {
                    idShipper: Number(err.response.data.data),
                  });
                },
                style: 'default',
              },
            ],
          );
        } else {
          Alert.alert('Lỗi khi đăng nhập', err.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            height: '40%',
            flex: 1,
            flexDirection: 'column-reverse',
          }}>
          <Text style={styles.text}>Đăng nhập để giao hàng.</Text>
        </View>

        <View style={styles.container_input}>
          <View style={styles.container_phone}>
            <TextInput
              style={styles.phone}
              placeholder="Nhập số điện thoại"
              keyboardType="numeric"
              placeholderTextColor="#aaa"
              value={phone}
              onChangeText={e => {
                setPhone(e);
              }}
              onBlur={() => {
                if (phone.match(/(0[3|5|7|8|9])+\d{8}\b/g)) {
                  setIsFormatPhone(false);
                } else {
                  setIsFormatPhone(true);
                }
              }}
              autoCorrect={false}
            />
          </View>
          {isFormatPhone && (
            <Text
              style={{
                marginLeft: '7%',
                color: 'red',
                fontSize: 14,
                marginTop: 4,
              }}>
              Số điện thoại không đúng
            </Text>
          )}

          <View style={styles.container_password}>
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.password}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#aaa"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              onPress={toggleShowPassword}
              style={{marginLeft: 10}}
            />
          </View>
        </View>
        <View
          style={{
            height: '40%',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <Text
            style={{textAlign: 'center', color: '#000000', fontSize: 16}}
            onPress={() => {
              navigation.navigate('signup');
            }}>
            Bạn chưa có tài khoản? Đăng ký.
          </Text>
          <TouchableHighlight
            style={styles.submit}
            onPress={handleSigIn}
            underlayColor="#fff">
            <Text style={styles.submitText}>Đăng nhập</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    fontSize: 42,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  container_input: {
    flex: 1,
    paddingTop: '10%',
  },
  phone: {
    color: '#000000',
    fontSize: 16,
  },
  container_password: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginHorizontal: '7%',
    borderWidth: 1,
    borderColor: '#909191',
    marginTop: 20,
  },
  container_phone: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginHorizontal: '7%',
    borderWidth: 1,
    borderColor: '#909191',
  },
  password: {
    flex: 1,
    color: '#000000',
    paddingRight: 10,
    fontSize: 16,
  },
  submit: {
    width: '80%',
    position: 'absolute',
    bottom: 20,
    left: '10%',
    paddingVertical: 15,
    backgroundColor: '#37A4E2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SignInScreen;
