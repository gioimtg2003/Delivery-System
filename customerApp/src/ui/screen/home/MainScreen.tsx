import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../lib/constant/color';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalInput from '../../components/ModalInput';
import {IPramListScreen} from '../../../lib/types/ParamListScreen';
import {ListHistory} from '../../components/ListHistory';
import {useCustomer} from '../../../lib/context/context';

const icon = require('../../../../assets/images/Logo.png');

const data = [{key: 'header'}];
function MainScreen({
  navigation,
}: {
  readonly navigation: NavigationProp<IPramListScreen>;
}): React.ReactElement {
  const [heightLocation, setHeightLocation] = useState<number>(0);
  const [addressSender, setAddressSender] = useState<string | undefined>(
    undefined,
  );
  const [addressReceiver, setAddressReceiver] = useState<string | undefined>(
    undefined,
  );
  const [isModalVisibleSender, seModalVisibleSender] = useState<boolean>(false);
  const [isModalVisibleReceiver, seModalVisibleReceiver] =
    useState<boolean>(false);
  const toggleModalSender = () => {
    seModalVisibleSender(!isModalVisibleSender);
  };
  const toggleModalReceiver = () => {
    seModalVisibleReceiver(!isModalVisibleReceiver);
  };

  useEffect(() => {
    if (addressSender && addressReceiver) {
      navigation.navigate('transport', {
        senderAddress: addressSender,
        receiverAddress: addressReceiver,
      });
    }
  }, [addressReceiver, addressSender, navigation]);
  const [refreshing, setRefreshing] = useState(false);
  const {ReLoadHistoryOrder} = useCustomer();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      ReLoadHistoryOrder();
    }, 500);
  }, [ReLoadHistoryOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={icon} style={{width: 50, height: 50}} />
        <Text
          style={{
            flex: 1,
            color: colors.placeholder,
            textAlign: 'center',
            marginLeft: -40,
            fontSize: 16,
          }}>
          Đặt hàng ngay
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.placeholder, 'green', 'blue']}
          />
        }
        data={data}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
        }}
        ListHeaderComponent={
          <View style={styles.cardInfo}>
            <View
              style={styles.containerAddress}
              onLayout={e => {
                setHeightLocation(e.nativeEvent.layout.height);
              }}>
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
                <TouchableOpacity
                  style={styles.sender}
                  activeOpacity={0.3}
                  onPress={toggleModalSender}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}>
                    {addressSender || 'Địa chỉ gửi hàng'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.receiver}
                  onPress={toggleModalReceiver}
                  activeOpacity={0.6}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    Địa chỉ giao hàng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        renderItem={() => {
          return (
            <>
              <View
                style={[
                  styles.row,
                  {
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                  },
                ]}>
                <Text
                  style={{
                    color: '#5a5a5a',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Đơn hàng gần đây
                </Text>
              </View>
              <ListHistory />
            </>
          );
        }}
      />

      <ModalInput
        visible={isModalVisibleSender}
        onClose={toggleModalSender}
        key={1}
        setAddress={setAddressSender}
      />
      <ModalInput
        visible={isModalVisibleReceiver}
        onClose={toggleModalReceiver}
        setAddress={setAddressReceiver}
        key={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 18,
    width: '90%',
  },
  _4: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  _1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  _2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  _3: {
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  headerRow: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: colors.bgInput,
  },
  row: {
    width: '100%',
  },
  infoSender: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sender: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  receiver: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  containerAddress: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 10,
  },
  containerIcon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAddressInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    flexWrap: 'wrap',
  },
  cardInfo: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  body: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
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
});
export default MainScreen;
