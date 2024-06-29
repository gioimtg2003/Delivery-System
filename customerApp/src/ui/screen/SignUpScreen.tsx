import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../lib/constant/color';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../components/Loading';
import Button from '../components/Button';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Axios} from '../../lib/utils/axios';
import {formatPhoneNumber} from '../../lib/utils/fornatPhoneNumber';

interface IFocus {
  phone?: boolean;
  password?: boolean;
  email?: boolean;
}

const SignUpScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}) => {
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [warningPhone, setWarningPhone] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [focus, setFocus] = useState<IFocus>({
    phone: false,
    password: false,
    email: false,
  });
  useEffect(() => {
    if (!phone || !password || warningPhone) {
      setColor('#bbb');
    } else {
      setColor(colors.placeholder);
    }
  }, [phone, password, setColor, warningPhone]);

  const handleSignUp = useCallback(() => {
    if (!phone || !password || warningPhone || !checkBox) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setLoading(true);
    new Axios()
      .getInstance()
      .post('/customer/auth/sign-up', {
        Phone: '84' + phone.replace(/ /g, ''),
        Password: password,
        Email: email,
      })
      .then(res => {
        console.log(res.data);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('otp-screen', {
            idCustomer: 1,
            phone: phone,
          });
        }, 1500);
      })
      .catch(err => {
        console.log(err.response.data.message);
        ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
        setLoading(false);
      });
  }, [phone, password, warningPhone, checkBox, setLoading, navigation, email]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tạo tài khoản của bạn</Text>
      <View
        style={[
          styles.container_phone,
          {
            borderColor: focus.phone ? colors.placeholder : '#eee',
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
            if (
              (phone.replace(/ /g, '').length < 9 ||
                phone.replace(/ /g, '').length >= 10) &&
              phone
            ) {
              setWarningPhone(true);
            } else {
              setWarningPhone(false);
            }
          }}
        />
      </View>
      {warningPhone && (
        <Text style={styles.warnigPhone}>Số điện thoại không hợp lệ</Text>
      )}
      <TextInput
        placeholder="Email (tùy chọn)"
        style={[
          styles.inputEmail,
          {borderColor: focus.email ? colors.placeholder : '#eee'},
        ]}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        onFocus={() => {
          setFocus({...focus, email: true});
        }}
        onBlur={() => {
          setFocus({...focus, email: false});
        }}
      />
      <View
        style={[
          styles.container_password,
          {
            borderColor: focus.password ? colors.placeholder : '#eee',
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
      <View style={styles.policy}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            setCheckBox(!checkBox);
          }}>
          <Feather
            name={checkBox ? 'check-square' : 'square'}
            size={20}
            color={checkBox ? colors.placeholder : '#aaa'}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: 'gray',
            fontSize: 15,
            textAlign: 'left',
            flexWrap: 'wrap',
          }}>
          Tôi muốn chấp nhận các ưu đãi từ Shippy. Tôi đã đọc và đồng ý với các
          điều khoản và chính sách của Shippy
        </Text>
      </View>
      <Button
        title="Đăng ký"
        onPress={handleSignUp}
        style={styles.btnSignUp}
        color={color}
        disabled={!(phone && password && !warningPhone)}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  policy: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    width: '100%',
  },
  btnSignUp: {
    width: '100%',
    borderRadius: 3,
    position: 'absolute',
    bottom: 10,
  },
  warnigPhone: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
  },
  inputEmail: {
    width: '100%',
    height: 60,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    color: 'black',
    fontSize: 15,
  },
  container_phone: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  password: {
    flex: 1,
    color: '#000000',
    paddingRight: 10,
    fontSize: 15,
  },
  inputPhone: {
    fontSize: 15,
    marginLeft: 2,
    color: 'black',
  },
  container_password: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 60,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
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
  },
});

export default SignUpScreen;
