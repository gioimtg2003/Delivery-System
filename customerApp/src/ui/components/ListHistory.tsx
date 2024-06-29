import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../lib/constant/color';
import {StatusColor} from './StatusColor';
import {useCustomer} from '../../lib/context/context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IPramListScreen} from '../../lib/types/ParamListScreen';
const iconHistory = require('../../../assets/images/icon-History.png');
const iconPickup = require('../../../assets/images/pickup.png');
const iconLocation = require('../../../assets/images/icon-location.png');
export const ListHistory = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<IPramListScreen>>();
  const {state} = useCustomer();
  return (
    <FlatList
      data={state.orderHistory}
      keyExtractor={item => item?.id || '1'}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('orderTracking', {
                idOrder: item.id as string,
              });
            }}
            activeOpacity={0.6}
            style={[
              {
                borderWidth: 1,
                borderColor: colors.bgInput,
                marginTop: 5,
                elevation: 4,
                marginBottom: 20,
                borderRadius: 2,
              },
            ]}>
            <View style={styles.headerRow}>
              <View style={styles._1}>
                <View style={styles._2}>
                  <Image source={iconHistory} width={28} height={28} />
                  <View style={styles._3}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '600',
                      }}>
                      {item.TimeCurrentStatus}
                    </Text>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 15,
                      }}>
                      {item.TransportName}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: '500',
                  }}>
                  {StatusColor(item.CurrentStatus as any)}
                </Text>
              </View>
            </View>
            <View style={styles._4}>
              <Image source={iconPickup} height={28} width={28} />
              <Text style={styles.text}>{item.SenderAddress}</Text>
            </View>
            <View style={styles._4}>
              <Image source={iconLocation} height={28} width={28} />
              <Text style={styles.text}>{item.ReceiverAddress}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
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
    paddingRight: 12,
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
    paddingHorizontal: 20,
  },
});
