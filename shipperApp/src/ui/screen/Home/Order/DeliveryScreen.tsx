import {NavigationProp} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {AppScreenParamList} from '../../../../types/ScreenParam';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDriver} from '../../../../lib/context/Driver/Context';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HashPermissionCall from '../../../../lib/utils/HashPermissionCall';
import HashPermissionSMS from '../../../../lib/utils/HashPermissionSMS';
import colors from '../../../../lib/constant/color';
import {FormatCurrency} from '../../../../lib/utils/converPrice';
import Button from '../../../component/Button';
import {formatPhoneNumber} from '../../../../lib/utils/fornatPhoneNumber';
import {axiosInstance} from '../../../../lib/utils/axios';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../../lib/context/auth.context';
const iconMoney = require('../../../../../assets/images/money-icon.png');

const DeliveryScreen = ({
  navigation,
}: {
  navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const {state} = useDriver();
  const {reload} = useAuth();
  const handleCall = useCallback(async () => {
    let permission = await HashPermissionCall();
    if (permission) {
      Linking.openURL(`tel:${state.orderPickup?.ReceiverPhone}`);
    }
  }, [state.orderPickup]);

  const handleSMS = useCallback(async () => {
    let permission = await HashPermissionSMS();
    if (permission) {
      Linking.openURL(`sms:${state.orderPickup?.ReceiverPhone}`).catch(err => {
        console.log(err);
      });
    }
  }, [state.orderPickup]);
  const deliverySuccess = useCallback(async () => {
    try {
      let update = await (await axiosInstance()).post('/shipper/order/success');
      if (update.data.code === 200) {
        reload();
        Toast.show({
          type: 'success',
          text1: 'Giao hàng thành công',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'home'}],
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
      });
    }
  }, [navigation, reload]);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={{width: '100%', flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('mapScreen', {
              destination: [
                Number(state.orderPickup?.ReceiverCoordinates?.split(',')[1]),
                Number(state.orderPickup?.ReceiverCoordinates?.split(',')[0]),
              ],
              type: 'delivery',
            });
            // Linking.openURL(
            //   `https://www.google.com/maps/search/?api=1&query=${state.orderPickup?.ReceiverCoordinates}`,
            // );
          }}
          style={[
            styles.iconContainer,
            {
              marginTop: 30,
            },
          ]}>
          <Entypo name="location-pin" size={24} color="#5BBCFF" />
          <Text style={styles.label}>{state.orderPickup?.ReceiverAddress}</Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#ddd',
            marginVertical: 15,
          }}
        />
        <View
          style={[
            styles.iconContainer,
            {
              marginTop: 6,
              width: '95%',
            },
          ]}>
          <EvilIcons name="user" size={30} color="#5BBCFF" />
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Thông tin người nhận
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#ddd',
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            marginTop: 8,
          }}>
          <Ionicons name="person-outline" size={24} color="#5BBCFF" />
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {state.orderPickup?.ReceiverName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            marginTop: 8,
          }}>
          <AntDesign name="phone" size={24} color="#5BBCFF" />
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginLeft: 8,
            }}>
            {`+84 ${formatPhoneNumber(
              String(state.orderPickup?.ReceiverPhone).replace('84', ''),
            )}`}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowBtn} onPress={handleCall}>
            <Feather name="phone" size={24} color={colors.primary} />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginLeft: 8,
              }}>
              Gọi điện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowBtn} onPress={handleSMS}>
            <MaterialIcons name="sms" size={24} color={colors.primary} />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginLeft: 8,
              }}>
              Nhắn tin
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowMoney}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={iconMoney} style={{width: 24, height: 24}} />
            <Text style={styles.labelMoney}>Số tiền cần thu</Text>
          </View>
          <Text style={styles.labelMoney}>
            {FormatCurrency(
              Number(state.orderPickup?.COD) +
                Number(
                  state.orderPickup?.isTakeShippingFee === 1
                    ? state.orderPickup?.ShippingFee
                    : 0,
                ),
            )}
          </Text>
        </View>

        <View style={styles.rowMoney}>
          <Text style={styles.labelMoney}>Phương thức thanh toán</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.labelMoney,
                {
                  marginRight: 8,
                },
              ]}>
              Tiền mặt
            </Text>
            <Image source={iconMoney} style={{width: 24, height: 24}} />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}>
        <Button
          title="Giao thất bại"
          onPress={() => {
            console.log('Giao thất bại');
          }}
          color="#aaa"
          style={{width: '48%'}}
        />
        <Button
          title="Giao thành công"
          onPress={deliverySuccess}
          style={{width: '48%', backgroundColor: colors.primary}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelMoney: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  rowMoney: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowBtn: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6a6a6a',
  },
  safe: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default DeliveryScreen;
