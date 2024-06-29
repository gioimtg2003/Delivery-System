import React from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../lib/constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
const image = require('../../../../assets/images/background_intro1.png');

const Intro_1Screen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerImg}>
          <Image
            source={image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={styles.containerText}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                color: colors.placeholder,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Giao hàng Shippy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginBottom: 10,
            }}>
            <Ionicons name="checkmark-done" size={30} color="#9BEC00" />
            <Text style={styles.text}>Tạo đơn dễ dàng</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginBottom: 10,
            }}>
            <Ionicons name="checkmark-done" size={30} color="#9BEC00" />
            <Text style={styles.text}>Quản lý thông minh</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginBottom: 10,
            }}>
            <Ionicons name="checkmark-done" size={30} color="#9BEC00" />
            <Text style={styles.text}>Nắm được tình trạng đơn hàng</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'sign-in'}],
            });
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 16,
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSignUp}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#5AB2FF',
              fontSize: 16,
            }}>
            Đăng ký tài khoản
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  containerText: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 20,
  },
  containerImg: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  header: {
    flex: 7,
    width: '100%',
  },
  footer: {
    flex: 3,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#A0DEFF',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnSignIn: {
    width: '90%',
    height: 50,
    backgroundColor: '#5AB2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
    elevation: 7,
  },
  btnSignUp: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
    elevation: 7,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});

export default Intro_1Screen;
