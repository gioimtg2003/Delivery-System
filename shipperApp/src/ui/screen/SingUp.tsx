import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageSignUp from '../component/ImageSignUp';
import {height, width} from '../../lib/constant/dimensions';
import colors from '../../lib/constant/color';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Axios} from '../../lib/utils/axios';
const SignUpScreen = (): React.ReactElement => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showKeyBoard, setShowKeyBoard] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSignUp = useCallback(() => {
    if (!name || !phone || !email || !password) {
      Alert.alert('Vui lòng nhập đầy đủ', 'Vui lòng nhập đầy đủ thông tin');
    }

    new Axios()
      .getInstance(false)
      .post('/shipper/auth/sign-up', {
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
      })
      .then(res => {
        console.log(res.data.data);
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
  }, [name, phone, email, password]);

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
        <View style={styles.input}>
          <Feather
            name="user"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Nhập tên của bạn"
            style={styles.textInput}
            placeholderTextColor={'black'}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.input}>
          <Feather
            name="phone-call"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Nhập số điện thoại của bạn"
            style={styles.textInput}
            placeholderTextColor={'black'}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.input}>
          <MaterialCommunityIcons
            name="email-box"
            size={20}
            color={colors.placeholder}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Nhập email của bạn"
            style={styles.textInput}
            placeholderTextColor={'black'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{
              width: '100%',
              fontSize: 16,
            }}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="black"
            autoCorrect={false}
            autoCapitalize="none"
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
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{
              width: '100%',
              fontSize: 16,
            }}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="black"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <MaterialIcons
            name={'password'}
            size={24}
            style={{marginLeft: 12}}
            color={colors.placeholder}
          />
        </View>

        {/* <View style={styles.input}>
            <Octicons
              name="location"
              size={20}
              color={colors.placeholder}
              style={{marginRight: 8}}
            />
            <TextInput
              placeholder="Nhập địa chỉ của bạn"
              style={{
                width: '100%',
                color: 'black',
              }}
              onFocus={() => setShowModal(true)}
              placeholderTextColor={'black'}
              value={address}
              onChangeText={setAddress}
              onPress={() => setShowModal(true)}
            />
          </View> */}
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

      {/* <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={styles.containerModal}></View>
        </Modal> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontSize: 16,
    height: 50,
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
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: 200,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
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
