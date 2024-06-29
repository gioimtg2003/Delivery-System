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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Axios} from '../../lib/utils/axios';
import {setToken} from '../../lib/utils/token';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Loading from '../component/Loading';
import {useDriver} from '../../lib/context/Driver/Context';
const SignInScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const {reload} = useDriver();
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const handleSigIn = () => {
    setLoading(true);
    new Axios()
      .getInstance(false)
      .post('/shipper/auth/sign-in', {
        phone: phone,
        password: password,
      })
      .then(res => {
        if (res.data.status === 'success') {
          console.log(res.data.data.data);
          setToken({
            accessToken: res.data.data.data.access_token,
            refreshToken: res.data.data.data.refresh_token,
            exp: res.data.data.data.exp,
          }).then(() => {
            reload();
            setTimeout(() => {
              setLoading(false);
              navigation.reset({
                index: 0,
                routes: [{name: 'home'}],
              });
            }, 1000);
          });
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Có lỗi xảy ra');
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
              onChangeText={setPhone}
              autoCorrect={false}
            />
          </View>
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
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
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
