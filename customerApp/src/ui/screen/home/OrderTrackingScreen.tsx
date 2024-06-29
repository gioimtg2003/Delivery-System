import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StatusColor} from '../../components/StatusColor';
import colors from '../../../lib/constant/color';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {IPramListScreen} from '../../../lib/types/ParamListScreen';
import {IOrder} from '../../../lib/types/Order';
import {axiosInstance} from '../../../lib/utils/axios';
import {formatPhoneNumber} from '../../../lib/utils/fornatPhoneNumber';
import {ConvertPrice} from '../../../lib/utils/ConvertPrice';
const iconMarker = require('../../../../assets/images/logo-maker.png');
const iconPickup = require('../../../../assets/images/pickup.png');
const iconLocation = require('../../../../assets/images/icon-location.png');
const iconMoney = require('../../../../assets/images/money-icon.png');
import Mapbox, {MarkerView} from '@rnmapbox/maps';
import {useCustomer} from '../../../lib/context/context';
import Loading from '../../components/Loading';
import Toast from 'react-native-toast-message';
import ReactNativeModal from 'react-native-modal';
Mapbox.setAccessToken(
  'sk.eyJ1IjoiZ2lvaW10ZzIwMDMiLCJhIjoiY2x4eW82YjdvMDJtbzJrcjJ2d2dwcWozNCJ9.bQ72__6wdbbyu4j41_2BVQ',
);
const OrderTrackingScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<IPramListScreen, 'orderTracking'>;
  readonly navigation: NavigationProp<IPramListScreen>;
}): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>([
    10.8260355, 106.7787453,
  ]);
  const {ReLoadHistoryOrder} = useCustomer();
  useEffect(() => {
    (async () => {
      try {
        let data = await (
          await axiosInstance()
        ).get(`/customer/order/${route.params.idOrder}`);
        setOrder(data.data.data);
        setCoordinates([
          Number(data.data.data.SenderCoordinates?.split(',')[1]),
          Number(data.data.data.SenderCoordinates?.split(',')[0]),
        ]);
      } catch (err: any) {
        console.log(err.response.data);
      }
    })();
  }, [route.params.idOrder]);
  const handleStatus = useCallback(
    async (status: 'cancel' | 'picked_up') => {
      try {
        let cancel = await (
          await axiosInstance()
        ).post('/customer/order/' + order?.id, {
          status: status,
        });
        if (cancel.data.status === 'success') {
          ReLoadHistoryOrder();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setIsVisibleModal(false);
            if (status === 'cancel') {
              Toast.show({
                type: 'success',
                text1: 'Hủy đơn hàng thành công',
              });
              navigation.reset({
                index: 0,
                routes: [{name: 'home'}],
              });
            }
          }, 1000);
        }
      } catch (error: any) {
        console.log(error.response.data);
      }
    },
    [order?.id, navigation, ReLoadHistoryOrder],
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safe}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL={Mapbox.StyleURL.Outdoors}
        logoEnabled={false}>
        <Mapbox.Camera zoomLevel={16} centerCoordinate={coordinates} />
        <MarkerView coordinate={coordinates}>
          <Image source={iconMarker} width={32} height={34} />
        </MarkerView>
      </Mapbox.MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          bottom: 0,
          borderWidth: 1,
          borderColor: '#9a9a9a',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        onPress={() => {
          setIsVisible(true);
        }}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          Chi tiết đơn hàng
        </Text>
      </TouchableOpacity>

      <ReactNativeModal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        swipeDirection="down"
        backdropOpacity={0.2}
        hasBackdrop={true}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
          paddingTop: 20,
        }}>
        <View style={styles.footer}>
          <View style={styles._1}>
            <View style={styles._2}>
              {StatusColor(order?.CurrentStatus ?? 'pending')}
              <Text style={styles._2_}>{order?.TimeCurrentStatus}</Text>
            </View>
            <Image source={iconPickup} width={30} height={30} />
          </View>
          <View style={styles._3}>
            <Text style={styles._3_}>
              1 Điểm giao - {(Number(order?.Distance) / 1000).toFixed(2)} Km
            </Text>
          </View>
          <View style={styles._4}>
            <Image source={iconPickup} height={28} width={28} />
            <View style={styles._4_}>
              <Text style={styles.text}>{order?.SenderAddress}</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: '500',
                  width: '85%',
                }}>
                {order?.SenderName} |{' 84 '}
                {formatPhoneNumber(
                  order?.SenderPhone.replace('84', '') ?? '000',
                )}
              </Text>
            </View>
          </View>
          <View style={styles._4}>
            <Image source={iconLocation} height={28} width={28} />
            <View style={styles._4_}>
              <Text style={styles.text}>{order?.ReceiverAddress}</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: '500',
                  width: '85%',
                }}>
                {order?.ReceiverName} |{' 84 '}
                {formatPhoneNumber(
                  order?.ReceiverPhone.replace('84', '') ?? '000',
                )}
              </Text>
            </View>
          </View>
          <View style={styles._6}>
            <Image source={iconMoney} height={28} width={28} />
            <Text style={styles._6_}>
              {ConvertPrice(order?.ShippingFee ?? 0)}
            </Text>
          </View>
          {order?.CurrentStatus === 'pending' && (
            <View style={styles._5}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: '100%',
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  elevation: 2,
                  backgroundColor: '#EEEEEE',
                  borderWidth: 1,
                  borderColor: '#F5F7F8',
                }}
                onPress={() => {
                  setIsVisibleModal(true);
                }}>
                <Text
                  style={{color: '#DC5F00', fontSize: 16, fontWeight: '600'}}>
                  Hủy đơn hàng
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {order?.CurrentStatus === 'pending_pickup' && (
            <View style={styles._7_}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: '48%',
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  elevation: 2,
                  backgroundColor: '#EEEEEE',
                  borderWidth: 1,
                  borderColor: '#F5F7F8',
                }}
                onPress={() => {
                  setIsVisibleModal(true);
                }}>
                <Text
                  style={{color: '#DC5F00', fontSize: 16, fontWeight: '600'}}>
                  Hủy đơn hàng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: '48%',
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  elevation: 2,
                  backgroundColor: colors.placeholder,
                  borderWidth: 1,
                  borderColor: colors.placeholder,
                }}
                onPress={() => {
                  handleStatus('picked_up');
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
                  Đã đưa hàng
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ReactNativeModal>
      {loading && <Loading />}
      <Modal
        visible={isVisibleModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisibleModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hủy đơn</Text>
            <Text style={styles.modalDes}>
              Bạn có muốn hủy đơn hàng này không?
            </Text>
            <View style={styles.modalAction}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsVisibleModal(false);
                }}>
                <Text style={styles.modalButtonTitle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => handleStatus('cancel')}>
                <Text
                  style={[
                    styles.modalButtonTitle,
                    styles.modalButtonTitleConfirm,
                  ]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalDes: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  modalAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonConfirm: {
    backgroundColor: colors.placeholder,
  },
  modalButtonTitle: {
    fontSize: 16,
    color: 'black',
  },
  modalButtonTitleConfirm: {
    color: 'white',
  },

  _6_: {
    color: '#4a4a5a',
    fontSize: 18,
    fontWeight: '600',
  },
  _6: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  _5: {
    marginTop: 18,
    width: '100%',
    paddingHorizontal: 10,
  },
  _7_: {
    marginTop: 18,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  _4_: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 18,
  },
  text: {
    color: '#4a4a5a',
    fontSize: 14,
    fontWeight: '500',
    width: '85%',
  },
  _4: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: '#9a9a9a',
    paddingBottom: 12,
  },
  _3_: {
    color: '#5a5a5a',
    fontSize: 15,
    fontWeight: '600',
  },
  _3: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.bgInput,
    marginBottom: 10,
  },
  _2_: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },
  _2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  _1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OrderTrackingScreen;
