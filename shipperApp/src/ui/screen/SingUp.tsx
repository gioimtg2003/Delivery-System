import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageSignUp from '../component/ImageSignUp';
import {height, width} from '../../lib/constant/dimensions';
import colors from '../../lib/constant/color';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Axios, axiosInstance} from '../../lib/utils/axios';
import {NavigationProp} from '@react-navigation/native';
import ListTransport from '../component/ListTransport';
import {ITransport} from '../../types/transport';
import {AppScreenParamList} from '../../types/ScreenParam';

interface IFocus {
  name?: boolean;
  phone?: boolean;
  email?: boolean;
  password?: boolean;
  rePassword?: boolean;
}

const SignUpScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [focus, setFocus] = useState<IFocus>({
    name: false,
    phone: false,
    email: false,
    password: false,
    rePassword: false,
  });
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showKeyBoard, setShowKeyBoard] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [transport, setTransport] = useState<ITransport | undefined>(undefined);
  const [transports, setTransports] = useState<ITransport[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await new Axios().getInstance(false).get('/transport-type');
        setTransports(res.data.data);
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
      }
    })();
    const showKeyBoard = Keyboard.addListener('keyboardDidShow', () => {
      setShowKeyBoard(true);
    });
    const hideKeyBoard = Keyboard.addListener('keyboardDidHide', () => {
      setShowKeyBoard(false);
    });
    return () => {
      showKeyBoard.remove();
      hideKeyBoard.remove();
    };
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  const handleSignUp = useCallback(() => {
    if (!name) {
      Alert.alert('Vui lòng nhập đầy đủ', 'Tên không được để trống');
      return;
    } else if (!phone) {
      Alert.alert('Vui lòng nhập đầy đủ', 'Số điện thoại không được để trống');
      return;
    } else if (!password || !rePassword) {
      Alert.alert('Vui lòng nhập đầy đủ', 'Mật khẩu không được để trống');
      return;
    }

    new Axios()
      .getInstance(false)
      .post('/shipper/auth/sign-up', {
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
        idTransport: transport?.id,
      })
      .then(res => {
        console.log(res.data.data);
        Alert.alert(
          'Đăng ký thành công',
          'Bạn đã đăng ký thành công, hãy tải lên thông tin cá nhân để chúng tôi xác thực thông tin của bạn',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'identity',
                      params: {idShipper: res.data.data.data.id},
                    },
                  ],
                });
              },
            },
          ],
        );
      })
      .catch(err => {
        Alert.alert('Đăng ký không thành công', err.response.data.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      });
  }, [name, phone, email, password, navigation, rePassword, transport?.id]);

  const handleFocus = useCallback((field: keyof IFocus) => {
    setFocus(prevFocus => ({...prevFocus, [field]: true}));
  }, []);

  const handleBlur = useCallback((field: keyof IFocus) => {
    setFocus(prevFocus => ({...prevFocus, [field]: false}));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!(showKeyBoard && !showModal) && (
        <View style={styles.containerImg}>
          <ImageSignUp />
        </View>
      )}

      <View
        style={[
          styles.containerInput,
          {
            flex: showKeyBoard ? 8 : 5,
          },
        ]}>
        <View
          style={[
            styles.input,
            {
              borderColor: focus.name ? colors.placeholder : '#eee',
            },
          ]}>
          <Feather
            name="user"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Tên đầy đủ"
            style={[styles.textInput]}
            placeholderTextColor={'#aaa'}
            value={name}
            onChangeText={setName}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
          />
        </View>
        <View
          style={[
            styles.input,
            {
              borderWidth: focus.phone ? 1 : 0,
              borderColor: focus.phone ? colors.placeholder : '#eee',
            },
          ]}>
          <Feather
            name="phone-call"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.textInput}
            placeholderTextColor={'#aaa'}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            onFocus={() => handleFocus('phone')}
            onBlur={() => handleBlur('phone')}
          />
        </View>
        <View
          style={[
            styles.input,
            {
              borderWidth: focus.email ? 1 : 0,
              borderColor: focus.email ? colors.placeholder : '#eee',
            },
          ]}>
          <MaterialCommunityIcons
            name="email-box"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Email (Tùy chọn)"
            style={styles.textInput}
            placeholderTextColor={'#aaa'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </View>
        <View
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: focus.password ? colors.placeholder : '#eee',
            },
          ]}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{
              width: '100%',
              fontSize: 16,
              color: 'black',
            }}
            placeholder="Mật khẩu"
            placeholderTextColor="#aaa"
            autoCorrect={false}
            autoCapitalize="none"
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            onPress={toggleShowPassword}
            style={{marginLeft: 12}}
            color={colors.placeholder}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={true}
            value={rePassword}
            onChangeText={setRePassword}
            style={{
              width: '100%',
              fontSize: 16,
              color: 'black',
            }}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#aaa"
            autoCorrect={false}
            autoCapitalize="none"
            onFocus={() => handleFocus('rePassword')}
            onBlur={() => handleBlur('rePassword')}
          />
          <MaterialIcons
            name={'password'}
            size={24}
            style={{marginLeft: 12}}
            color={colors.placeholder}
          />
        </View>
        {!(password == rePassword) && rePassword != '' && (
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              alignSelf: 'flex-start',
              marginLeft: 20,
            }}>
            Mật khẩu không khớp
          </Text>
        )}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 10,
            backgroundColor: colors.bgInput,
            borderWidth: 1,
            borderColor: '#eee',
            marginHorizontal: -10,
          }}>
          <Text
            style={{
              width: '100%',
              color: transport?.Name ? 'black' : '#aaa',
            }}>
            {transport?.Name ? transport?.Name : 'Chọn phương tiện'}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down-circle-outline"
            size={20}
            color={'#aaa'}
            style={{}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: height * 0.3,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 2,
        }}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            width: width * 0.9,
            height: 40,
            backgroundColor: colors.placeholder,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            elevation: 7,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
            }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.containerModal}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: width,
              backgroundColor: 'white',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <ListTransport
              data={transports}
              setVehicle={setTransport}
              close={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontSize: 16,
    height: 50,
    color: 'black',
  },
  container_password: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.bgInput,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    height: height,
    width: width,
  },
  containerImg: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  containerInput: {
    width: width * 0.8,
    height: height * 0.35,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: '#eee',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: 200,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  inputAddress: {
    width: '100%',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.bgInput,
    flex: 1,
    // height: 50,
  },
  itemsFlatList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },
  containerBottomModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SignUpScreen;
