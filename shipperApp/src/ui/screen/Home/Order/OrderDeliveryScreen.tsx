import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppScreenParamList} from '../../../../types/ScreenParam';
import {FormatCurrency} from '../../../../lib/utils/converPrice';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../../../../lib/constant/color';
import GetCurrentLocation from '../../../../lib/utils/GetCurrentLocation';
import {useDriver} from '../../../../lib/context/Driver/Context';
const OrderDeliveryScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<AppScreenParamList, 'orderDelivery'>;
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const {getOrderPickup, state} = useDriver();
  useEffect(() => {
    navigation.setOptions({
      title: 'Giao hàng',
      headerTitleAlign: 'center',
    });
    getOrderPickup();
  }, [navigation, route, getOrderPickup]);
  const destination = useMemo((): string | undefined => {
    return state.orderPickup?.CurrentStatus === 'pending_pickup'
      ? state.orderPickup?.SenderCoordinates
      : state.orderPickup?.ReceiverCoordinates;
  }, [state.orderPickup]);
  const openMap = useCallback(async () => {
    console.log('Open map');
    const {latitude, longitude} = await GetCurrentLocation();
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`,
    ).catch(err => console.error('An error occurred', err));
  }, [destination]);
  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          paddingHorizontal: 18,
          paddingVertical: 10,
        }}>
        <Text style={styles.title}>Nhận tiền mặt</Text>
        <Text style={styles.price}>
          {Number(state.orderPickup?.isTakeShippingFee) === 1
            ? '0 đ'
            : FormatCurrency(state.orderPickup?.ShippingFee || 0)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'normal',
            textAlign: 'left',
            color: '#3a3a3a',
          }}>
          Tổng chi phí
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'left',
            color: '#4a4a4a',
          }}>
          {FormatCurrency(state.orderPickup?.Charge || 0)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'normal',
            textAlign: 'left',
            color: '#3a3a3a',
          }}>
          Tiền COD cần ứng trước
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'left',
            color: '#4a4a4a',
          }}>
          {FormatCurrency(state.orderPickup?.COD || 0)}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 6,
          backgroundColor: '#f2f2f2',
          marginTop: 20,
        }}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 18,
          paddingVertical: 10,
          justifyContent: 'flex-end',
        }}>
        <Text
          onPress={openMap}
          style={{
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left',
            color: colors.primary,
          }}>
          Xem đường đi
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('pickupScreen');
        }}
        activeOpacity={0.5}
        style={[
          styles.iconContainer,
          {
            borderWidth: 1,
            borderColor: colors.primary,
          },
        ]}>
        <Octicons name="dot-fill" size={24} color={colors.placeholder} />
        <Text style={styles.label}>{state.orderPickup?.SenderAddress}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          state.orderPickup?.CurrentStatus !== 'pending_pickup' && {
            borderWidth: 1,
            borderColor: colors.primary,
          },
        ]}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('deliveryScreen');
        }}>
        <Octicons
          name={
            state.orderPickup?.CurrentStatus !== 'pending_pickup'
              ? 'dot-fill'
              : 'dot'
          }
          size={24}
          color={colors.placeholder}
        />
        <Text style={styles.label}>{state.orderPickup?.ReceiverAddress}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 14,
    width: '98%',
    paddingVertical: 20,
    marginHorizontal: 3,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#000',
  },
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default OrderDeliveryScreen;
