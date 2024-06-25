import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../../../lib/constant/color';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalOnline from '../../../component/ModalOnline';
import ListOrder from '../../../component/ListOrder';
import {NavigationProp} from '@react-navigation/native';
import {useDriver} from '../../../../lib/context/Driver/Context';
import Loading from '../../../component/Loading';
import {AppScreenParamList} from '../../../../types/ScreenParam';
const icon = require('../../../../../assets/images/Logo-2.png');
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import HashPermissionLocation from '../../../../lib/utils/HashPermissionLocataion';
const POLLING_INTERVAL = 3000;

const OrderListScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {state} = useDriver();
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
          <Text>{state.driver?.Name}</Text>
          <Entypo
            name="dot-single"
            size={25}
            color={state.driver?.OnlineStatus ? 'green' : 'gray'}
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
        {state.driver?.OnlineStatus ? (
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
