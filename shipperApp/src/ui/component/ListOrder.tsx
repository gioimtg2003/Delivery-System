import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp} from '@react-navigation/native';
import Button from './Button';
import colors from '../../lib/constant/color';
import {useDriver} from '../../lib/context/Driver/Context';
import {ConvertPrice} from '../../lib/utils/converPrice';
import {AppScreenParamList} from '../../types/ScreenParam';

const ListOrder = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const {state, reloadOrderList} = useDriver();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      reloadOrderList();
    }, 500);
  }, [reloadOrderList]);
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.placeholder, 'green', 'blue']}
        />
      }
      style={{width: '100%', zIndex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}
      data={state.orderList}
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
                ({(item.Distance / 1000).toFixed(2)} Km) Lấy đơn ngay
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.iconContainer}>
                <EvilIcons name="location" size={24} color="#A0DEFF" />
                <Text style={styles.label}>{item.SenderAddress}</Text>
              </View>
              <View style={styles.dottedLine} />
              <View style={styles.iconContainer}>
                <Entypo name="location-pin" size={24} color="#5BBCFF" />
                <Text style={styles.label}>{item.ReceiverAddress}</Text>
              </View>
            </View>
            <View style={styles.containerTransport}>
              <Text style={[styles.label, {flex: 3}]}>{item.Note}</Text>
            </View>
            <View style={styles.containerBottom}>
              <Text style={[styles.label, {flex: 3}]}>
                {ConvertPrice(item.ShippingFee)}
              </Text>
              <Button
                title="Xem chi tiết"
                onPress={() =>
                  navigation.navigate('orderDetails', {
                    id: item.id,
                  })
                }
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
    marginTop: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C4E4FF',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#C4E4FF',
    paddingTop: 10,
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
    color: 'black',
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
