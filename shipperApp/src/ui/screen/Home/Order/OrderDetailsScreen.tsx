import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import SliderButton from '../../../component/SliderButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {height, width} from '../../../../lib/constant/dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../lib/constant/color';
import {FormatCurrency} from '../../../../lib/utils/converPrice';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {IOrder} from '../../../../types/Order';
import {axiosInstance} from '../../../../lib/utils/axios';
import {AppScreenParamList} from '../../../../types/ScreenParam';

const OrderDetailsScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<AppScreenParamList, 'orderDetails'>;
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [order, setOrder] = React.useState<IOrder | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await (
          await axiosInstance()
        ).get(`/shipper/order/${route.params.id}`);
        setOrder(response.data.data);
      } catch (error) {
        ToastAndroid.show('Lỗi khi lấy dữ liệu', ToastAndroid.SHORT);
      }
    })();
  }, [route.params.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBack}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>
            Cách bạn {order?.DistanceToSender} km
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center', width: width}}>
        <View style={styles.body}>
          <View style={styles.containerAddress}>
            <View style={styles.containerIcon}>
              <EvilIcons name="location" size={24} color="#A0DEFF" />
              <View
                style={{
                  height: 60,
                  width: 1,
                  borderStyle: 'dashed',
                  borderColor: '#5BBCFF',
                  borderWidth: 1,
                }}
              />
              <Entypo name="location-pin" size={24} color="#5BBCFF" />
            </View>
            <View style={styles.containerAddressInfo}>
              <Text>{order?.SenderAddress}</Text>
              <Text>{order?.ReceiverAddress}</Text>
            </View>
          </View>
          {order?.Note && (
            <View style={styles.containerBox}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}>
                <SimpleLineIcons
                  name="note"
                  size={24}
                  color={colors.placeholder}
                  style={{marginBottom: 10}}
                />
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>
                  Ghi chú
                </Text>
              </View>
              <Text>{order.Note}</Text>
            </View>
          )}

          <View style={styles.containerBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome6
                  name="money-check"
                  size={24}
                  color={colors.placeholder}
                  style={{marginBottom: 10}}
                />
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>
                  Tiền thu hộ
                </Text>
              </View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {FormatCurrency(order?.COD as number)}
              </Text>
            </View>
          </View>

          <View style={styles.containerBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome6
                  name="money-bill-wave"
                  size={24}
                  color={colors.placeholder}
                  style={{marginBottom: 10}}
                />
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>
                  Tiền mặt
                </Text>
              </View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {FormatCurrency(order?.ShippingFee as number)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBtn}>
        <SliderButton
          onCLick={() => {
            if (order) {
              console.log(order.id);
              setTimeout(() => {
                navigation.navigate('orderDelivery', {
                  id: order.id,
                });
              }, 1000);
            }
          }}
          title="Trượt để nhận đơn"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBox: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: 'white',
    marginTop: 10,
    width: '95%',
    borderRadius: 7,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerPrice: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: 'white',
    marginTop: 10,
    width: '95%',
    borderRadius: 7,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerIcon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  containerAddressInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%',
    width: '90%',
    flexWrap: 'wrap',
  },
  containerAddress: {
    width: '95%',
    height: height / 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 5,
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  headerBack: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#5BBCFF',
    flex: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 5,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f6fc',
  },
  containerBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default OrderDetailsScreen;
