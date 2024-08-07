import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../lib/constant/color';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalOnline from '../../../component/ModalOnline';
import ListOrder from '../../../component/ListOrder';
import {NavigationProp} from '@react-navigation/native';
import Loading from '../../../component/Loading';
import {AppScreenParamList} from '../../../../types/ScreenParam';
const icon = require('../../../../../assets/images/Logo-2.png');
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import HashPermissionLocation from '../../../../lib/utils/HashPermissionLocataion';
import {useAuth} from '../../../../lib/context/auth.context';
const POLLING_INTERVAL = 3000;

const OrderListScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {driver} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      HashPermissionLocation().then(permission => {
        if (permission) {
          const checkGPS = () => {
            promptForEnableLocationIfNeeded({
              interval: POLLING_INTERVAL,
              waitForAccurate: true,
            })
              .then(data => {
                console.log(data);
                if (data && data === 'already-enabled') {
                  if (intervalId.current) {
                    clearInterval(intervalId.current);
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          };
          intervalId.current = setInterval(checkGPS, POLLING_INTERVAL);
        }
      });

      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      };
    }
  }, []);

  const click = useCallback(() => {
    if (driver?.idOrder) {
      navigation.navigate('orderDelivery', {id: driver.idOrder});
    }
  }, [driver?.idOrder, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerName}>
          <SimpleLineIcons
            name="user"
            size={16}
            color={colors.placeholder}
            style={{
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginRight: 5,
            }}>
            {driver?.Name}
          </Text>
          <Entypo
            name="dot-single"
            size={25}
            color={driver?.OnlineStatus ? 'green' : 'gray'}
          />
        </View>
        <SimpleLineIcons
          name="settings"
          size={20}
          color={'black'}
          onPress={() => {
            setOpenModal(true);
          }}
        />
      </View>
      <View style={styles.main}>
        {driver?.OnlineStatus ? (
          <ListOrder navigation={navigation} />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icon} style={{width: 70, height: 70}} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'normal',
                color: colors.placeholder,
              }}>
              Bạn đang offline
            </Text>
          </View>
        )}
      </View>
      {driver?.Status === 'Delivering' && driver?.idOrder && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.order_require}
          onPress={click}>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              width: '60%',
            }}>
            Bạn đang có đơn hàng cần giao
          </Text>
          <FontAwesome6
            name="angle-right"
            size={25}
            color={colors.placeholder}
            style={{width: '10%'}}
          />
        </TouchableOpacity>
      )}

      <ModalOnline
        visible={openModal}
        onClose={() => setOpenModal(false)}
        loading={setLoading}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  order_require: {
    position: 'absolute',
    bottom: 10,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.placeholder,
    width: '95%',
    zIndex: 100,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  containerName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderListScreen;
