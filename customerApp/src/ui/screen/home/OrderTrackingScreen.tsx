import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import Mapbox, {PointAnnotation} from '@rnmapbox/maps';
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
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const {ReLoadHistoryOrder, socket} = useCustomer();
  const [coordinatesDriver, setCoordinatesDriver] = useState<number[] | null>(
    null,
  );
  const [transportDriver, setTransportDriver] = useState<any>(null);
  const [coordinatesReceiver, setCoordinatesReceiver] = useState<number[]>([
    106.7787453, 10.8260355,
  ]);
  const [showMarker, setShowMarker] = useState<boolean>(false);
  const features: GeoJSON.FeatureCollection = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 'a-feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [106.724116, 10.872008],
              [106.725658, 10.872547],
              [106.726322, 10.871351],
              [106.732238, 10.873364],
              [106.733608, 10.868184],
              [106.73483, 10.868648],
              [106.739032, 10.866199],
              [106.741285, 10.865896],
              [106.742331, 10.863456],
              [106.737594, 10.859179],
              [106.738019, 10.855913],
              [106.73214, 10.854012],
              [106.729865, 10.852254],
              [106.728489, 10.84505],
              [106.729594, 10.844766],
              [106.731139, 10.838856],
              [106.730227, 10.838602],
              [106.73076, 10.836507],
              [106.726907, 10.833282],
              [106.731219, 10.828358],
              [106.730458, 10.827601],
              [106.731181, 10.826874],
              [106.731012, 10.826011],
              [106.727189, 10.823077],
              [106.724376, 10.821927],
              [106.716898, 10.820835],
              [106.716607, 10.819172],
              [106.717918, 10.817071],
              [106.718826, 10.817131],
              [106.719386, 10.816305],
              [106.715078, 10.812181],
              [106.711205, 10.816504],
              [106.710182, 10.814639],
              [106.709511, 10.814817],
              [106.708853, 10.814035],
              [106.704248, 10.819452],
              [106.703385, 10.824511],
              [106.697848, 10.82317],
              [106.697519, 10.824116],
              [106.696138, 10.823749],
              [106.693898, 10.826083],
              [106.693482, 10.825708],
              [106.690228, 10.827853],
              [106.685081, 10.833256],
              [106.682987, 10.837178],
              [106.68098, 10.836517],
              [106.680055, 10.838596],
              [106.673449, 10.838612],
              [106.673609, 10.840315],
              [106.671875, 10.840601],
              [106.669348, 10.842919],
              [106.664786, 10.845129],
              [106.664596, 10.848228],
              [106.665689, 10.855394],
              [106.662199, 10.855076],
              [106.658908, 10.857465],
              [106.656777, 10.857361],
              [106.655342, 10.858574],
              [106.652791, 10.859248],
              [106.652185, 10.858648],
              [106.649929, 10.860938],
              [106.649601, 10.865029],
              [106.641833, 10.869834],
              [106.637753, 10.871916],
              [106.636846, 10.870436],
              [106.630951, 10.874043],
              [106.626687, 10.875195],
              [106.625734, 10.876682],
              [106.620957, 10.879032],
              [106.616426, 10.88255],
              [106.613349, 10.882993],
              [106.60825, 10.88574],
              [106.601482, 10.887959],
              [106.602228, 10.890555],
              [106.601188, 10.892017],
              [106.596202, 10.892874],
              [106.596533, 10.894361],
              [106.592397, 10.897273],
              [106.592192, 10.89854],
              [106.593026, 10.89925],
              [106.591785, 10.899791],
              [106.589602, 10.9042],
              [106.584617, 10.907278],
              [106.584281, 10.908554],
              [106.58322, 10.90895],
              [106.583291, 10.911004],
              [106.584129, 10.9112],
            ],
          },
          properties: {},
        } as const,
      ],
    };
  }, []);
  useEffect(() => {
    const handleTrackingOrder = (data: any) => {
      if (data.orderId === order?.id) {
        if (data.transport === '5') {
          setTransportDriver(
            require('../../../../assets/images/marker/bike.png'),
          );
        } else if (data.transport === '6') {
          setTransportDriver(
            require('../../../../assets/images/marker/van.png'),
          );
        } else {
          setTransportDriver(
            require('../../../../assets/images/marker/truck.png'),
          );
        }
        setCoordinatesDriver([data.lng, data.lat]);
      }
    };

    socket.on('TrackingOrder', handleTrackingOrder);

    return () => {
      socket.off('TrackingOrder', handleTrackingOrder);
    };
  }, [socket, order?.id]);
  useEffect(() => {
    setTimeout(() => {
      setShowMarker(true);
    }, 1000);
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
        setCoordinatesReceiver([
          Number(data.data.data.ReceiverCoordinates?.split(',')[1]),
          Number(data.data.data.ReceiverCoordinates?.split(',')[0]),
        ]);
        console.log(data.data.data);
        if (
          data.data.data.CurrentStatus !== 'Cancel' ||
          data.data.data.CurrentStatus !== 'Success'
        ) {
          socket.emit('JoinRoom', {room: route.params.idOrder});
          return () => {
            socket.emit('LeaveRoom', {room: route.params.idOrder});
          };
        }
      } catch (err: any) {
        console.log(err.response.data);
      }
    })();
  }, [route.params.idOrder, socket]);
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
  console.log(coordinatesDriver);
  return (
    <SafeAreaView style={styles.safe}>
      <Mapbox.MapView
        localizeLabels={{locale: 'vi'}}
        style={styles.map}
        zoomEnabled={true}
        styleURL={'mapbox://styles/gioimtg2003/cly3bplv3007k01qp87hradf3'}
        logoEnabled={false}>
        {coordinates && (
          <>
            <Mapbox.Camera
              centerCoordinate={[
                (coordinates[0] + coordinatesReceiver[0]) / 2,
                (coordinates[1] + coordinatesReceiver[1]) / 2,
              ]}
              padding={{
                paddingTop: 50,
                paddingLeft: 50,
                paddingRight: 50,
                paddingBottom: 50,
              }}
              zoomLevel={10}
              animationDuration={2000}
            />

            {showMarker && (
              <PointAnnotation coordinate={coordinates} id="1">
                <Image source={iconMarker} width={32} height={34} />
              </PointAnnotation>
            )}
          </>
        )}
        {showMarker && coordinatesDriver && (
          <PointAnnotation coordinate={coordinatesDriver} id="3">
            <Image source={transportDriver} width={24} height={24} />
          </PointAnnotation>
        )}
        {/* <ShapeSource id="a=feature" shape={features}>
          <LineLayer
            id="line1"
            sourceLayerID="a-feature"
            style={{
              lineColor: colors.placeholder,
              lineWidth: 7,
            }}
          />
        </ShapeSource> */}
        {showMarker && coordinatesReceiver && (
          <PointAnnotation coordinate={coordinatesReceiver} id="2">
            <Image source={iconLocation} width={32} height={34} />
          </PointAnnotation>
        )}
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
          {(order?.CurrentStatus === 'pending' ||
            order?.CurrentStatus === 'pending_pickup') && (
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
