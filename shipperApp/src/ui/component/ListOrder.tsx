import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Button from './Button';
import colors from '../../lib/constant/color';
const orders = [
  {
    id: 1,
    senderAddress: '200 Duong Dinh Hoi',

    receiverAddress:
      '200 Duong Dinh Hoi, Phuong Phuoc Long B, Quan 9, Thanh pho Ho Chi Minh',
    distance: 10,
    price: 10000,
    transportType: 'Xe máy',
    description: 'Vào lấy hàng gọi cho tôi trước khi đến cổng của chung cư',
  },
  {
    id: 2,
    senderAddress:
      '200 Duong Dinh Hoi, Phuong Phuoc Long B, Quan 9, Thanh pho Ho Chi Minh',

    receiverAddress:
      '200 Duong Dinh Hoi, Phuong Phuoc Long B, Quan 9, Thanh pho Ho Chi Minh',
    distance: 10,
    price: 10000,
    transportType: 'Xe máy',
    description: 'Vào lấy hàng gọi cho tôi trước khi đến cổng của chung cư',
  },
  {
    id: 3,
    senderAddress: '200 Duong Dinh Hoi',

    receiverAddress:
      '200 Duong Dinh Hoi, Phuong Phuoc Long B, Quan 9, Thanh pho Ho Chi Minh',
    distance: 10,
    price: 10000,
    transportType: 'Xe máy',
    description: 'Vào lấy hàng gọi cho tôi trước khi đến cổng của chung cư',
  },
  {
    id: 4,
    senderAddress: '200 Duong Dinh Hoi',

    receiverAddress:
      '200 Duong Dinh Hoi, Phuong Phuoc Long B, Quan 9, Thanh pho Ho Chi Minh',
    distance: 10,
    price: 10000,
    transportType: 'Xe máy',
    description:
      'Vào lấy hàng gọi cho tôi trước khi đến cổng của chung cư, nhớ gọi trước khi đến cổng chung cư',
  },
];

const ListOrder = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.placeholder, 'green', 'blue']}
        />
      }
      showsVerticalScrollIndicator={false}
      data={orders}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                ({item.distance} Km) Lấy đơn ngay
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.iconContainer}>
                <EvilIcons name="location" size={24} color="#A0DEFF" />
                <Text style={styles.label}>{item.senderAddress}</Text>
              </View>
              <View style={styles.dottedLine} />
              <View style={styles.iconContainer}>
                <Entypo name="location-pin" size={24} color="#5BBCFF" />
                <Text style={styles.label}>{item.receiverAddress}</Text>
              </View>
            </View>
            <View style={styles.containerTransport}>
              <Text style={[styles.label, {flex: 3}]}>{item.description}</Text>
              <Text
                style={[
                  styles.label,
                  {
                    flex: 2,
                    textAlign: 'right',
                  },
                ]}>
                {item.transportType}
              </Text>
            </View>
            <View style={styles.containerBottom}>
              <Text style={[styles.label, {flex: 3}]}>{item.price}đ</Text>
              <Button
                title="Xem chi tiết"
                onPress={() => navigation.navigate('orderDetails')}
                style={{flex: 4}}
              />
            </View>
          </View>
        );
      }}
      keyExtractor={item => item.id.toString()}
    />
  );
};
const styles = StyleSheet.create({
  containerPrice: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C4E4FF',
  },
  containerTransport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C4E4FF',
    paddingBottom: 10,
  },
  addressContainer: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'blue',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  dottedLine: {
    width: 1,
    height: 70,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 12,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: '#5BBCFF',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ListOrder;
