import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {WALLET} from '../../lib/constant/wallet';
import {useDriver} from '../../lib/context/Driver/Context';
import {ConvertPrice} from '../../lib/utils/converPrice';
const convertColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#f0ad4e';
    case 'accept':
      return '#5cb85c';
    case 'reject':
      return '#d9534f';
    default:
      return '#3a3a3a';
  }
};
const HistoryWallet = (): React.ReactElement => {
  const {state} = useDriver();

  return (
    <FlatList
      data={state.wallet}
      keyExtractor={item => item?.id?.toString() ?? ''}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <View style={styles.rowHistory}>
            <View style={styles.row}>
              <Text style={{fontSize: 16, color: '#3a3a3a'}}>
                {WALLET.ACTION[item.Action]}
              </Text>
              <Text style={{fontSize: 16, color: '#3a3a3a', marginLeft: 20}}>
                {item.TimeSubmit}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{fontSize: 16, color: '#3a3a3a'}}>
                {ConvertPrice(item.Amount)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: convertColor(item.Status),
                  marginLeft: 20,
                }}>
                {WALLET.STATUS[item.Status]}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  rowHistory: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HistoryWallet;
