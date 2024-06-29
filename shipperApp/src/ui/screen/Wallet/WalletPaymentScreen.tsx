import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
const WalletPaymentScreen = (): React.ReactElement => {
  return <SafeAreaView style={styles.safeArea}></SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default WalletPaymentScreen;
