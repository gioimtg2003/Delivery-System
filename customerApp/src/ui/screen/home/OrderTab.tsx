import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ListHistory} from '../../components/ListHistory';

const OrderTab = (): React.ReactElement => {
  return (
    <SafeAreaView style={styles.safe}>
      <ListHistory />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OrderTab;
