import {NavigationProp} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {AppScreenParamList} from '../../../../types/ScreenParam';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
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
import {axiosInstance} from '../../../../lib/utils/axios';
import Toast from 'react-native-toast-message';
import {formatPhoneNumber} from '../../../../lib/utils/fornatPhoneNumber';
const iconMoney = require('../../../../../assets/images/money-icon.png');
const PickupScreen = ({
  navigation,
}: {
  navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const {state, showWarning, getOrderPickup} = useDriver();
  const handleCall = useCallback(async () => {
    let permission = await HashPermissionCall();
    if (permission) {
      Linking.openURL(`tel:${state.orderPickup?.SenderPhone}`);
    }
  }, [state.orderPickup]);

  const handleSMS = useCallback(async () => {
    let permission = await HashPermissionSMS();
    if (permission) {
      Linking.openURL(`sms:${state.orderPickup?.SenderPhone}`).catch(err => {
        console.log(err);
      });
    }
  }, [state.orderPickup]);

  const handlePickup = useCallback(async () => {
    try {
      let pickup = await (
        await axiosInstance()
      ).put('/shipper/order/pickup/delivery');
      if (pickup.data.status === 'success') {
        if (navigation.canGoBack()) {
          getOrderPickup();
          Toast.show({
            type: 'success',
            text1: 'Lấy đơn thành công',
          });

          navigation.goBack();
        }
      }
    } catch (err: any) {
      console.error(err.response.data);
      if (err.response.data.message === 'cannot_update') {
        showWarning(
          '',
          'Lấy đơn hàng không thành công, Vui lòng chờ xác nhận!',
        );
      }
    }
  }, [navigation, showWarning, getOrderPickup]);

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
                Number(state.orderPickup?.SenderCoordinates?.split(',')[1]),
                Number(state.orderPickup?.SenderCoordinates?.split(',')[0]),
              ],
              type: 'pickup',
            });
            // Linking.openURL(
            //   `https://www.google.com/maps/search/?api=1&query=${state.orderPickup?.SenderCoordinates}`,
            // );
          }}
          style={[
            styles.iconContainer,
            {
              marginTop: 30,
            },
          ]}>
          <Entypo name="location-pin" size={24} color="#5BBCFF" />
          <Text style={styles.label}>{state.orderPickup?.SenderAddress}</Text>
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
            Thông tin người gửi
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
            {state.orderPickup?.SenderName}
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
              String(state.orderPickup?.SenderPhone).replace('84', ''),
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
        <Text style={styles.title}>Thanh toán</Text>
        {Number(state.orderPickup?.isCOD) === 1 && (
          <View style={styles.rowMoney}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={iconMoney} style={{width: 24, height: 24}} />
              <Text style={styles.labelMoney}>Số tiền cần ứng</Text>
            </View>
            <Text style={styles.labelMoney}>
              {FormatCurrency(state.orderPickup?.COD || 0)}
            </Text>
          </View>
        )}
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
      {state.orderPickup?.CurrentStatus === 'pending_pickup' && (
        <Button
          title="Đã lấy hàng"
          onPress={handlePickup}
          style={{
            width: '90%',
            marginBottom: 20,
          }}
        />
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    width: '90%',
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

export default PickupScreen;
