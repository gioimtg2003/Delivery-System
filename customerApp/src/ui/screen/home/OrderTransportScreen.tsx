import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {height} from '../../../lib/constant/dimensions';
import {ITransport} from '../../../lib/types/transport';
import ListTransport from '../../components/ListTransport';
import axios from 'axios';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {IPramListScreen} from '../../../lib/types/ParamListScreen';
import colors from '../../../lib/constant/color';
interface ICoordinate {
  lng: number;
  lat: number;
}
interface CostInfo {
  Duration: string;
  Cost: number;
  Distance: string;
}

const OrderTransportScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<IPramListScreen, 'transport'>;
  readonly navigation: NavigationProp<IPramListScreen>;
}): React.ReactElement => {
  const [selectTransport, setSelectTransport] = useState<
    (CostInfo & ITransport) | null
  >();
  const [coordinateSender, setCoordinateSender] = useState<ICoordinate | null>(
    null,
  );
  const [coordinateReceiver, setCoordinateReceiver] =
    useState<ICoordinate | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let resSender = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${route.params.senderAddress}&limit=8&lang=vi_VN&in=countryCode:VNM&apiKey=587XSa96XuwYywlauSpCMNQf5bb79MSyZLPgXwAF3Bs`,
        );
        let resReceiver = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${route.params.receiverAddress}&limit=8&lang=vi_VN&in=countryCode:VNM&apiKey=587XSa96XuwYywlauSpCMNQf5bb79MSyZLPgXwAF3Bs`,
        );
        setCoordinateReceiver({
          lat: resReceiver.data.items[0].position.lat,
          lng: resReceiver.data.items[0].position.lng,
        });
        setCoordinateSender({
          lat: resSender.data.items[0].position.lat,
          lng: resSender.data.items[0].position.lng,
        });
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Địa chỉ không hợp lệ', ToastAndroid.SHORT);
      }
    })();
  }, [route.params.senderAddress, route.params.receiverAddress]);

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.text}>{route.params.senderAddress}</Text>
          <View
            style={{
              width: '100%',
              height: 1,
              borderWidth: 1,
              borderBlockColor: '#eee',
            }}
          />
          <Text style={styles.text}>{route.params.receiverAddress}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <ListTransport
          setVehicle={setSelectTransport}
          sender={coordinateSender}
          receiver={coordinateReceiver}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            elevation: 2,
            backgroundColor: colors.placeholder,
          }}
          onPress={() => {
            if (selectTransport) {
              navigation.navigate('order-info', {
                idTransport: selectTransport.id,
                shippingFee: selectTransport.Cost,
              });
            } else {
              ToastAndroid.show('Chọn phương tiện', ToastAndroid.SHORT);
            }
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 15,
  },
  body: {
    padding: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
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
    width: '100%',
    height: height / 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0f0',
  },
});

export default OrderTransportScreen;
