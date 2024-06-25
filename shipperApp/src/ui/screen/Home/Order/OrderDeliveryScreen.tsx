import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {AppScreenParamList} from '../../../../types/ScreenParam';
const OrderDeliveryScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<AppScreenParamList, 'orderDelivery'>;
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  useEffect(() => {
    navigation.setOptions({
      title: `Đơn hàng ${route.params.id}`,
      headerTitleAlign: 'center',
    });
  }, [navigation, route]);
  return (
    <SafeAreaView style={styles.safe}>
      <Text>OrderDeliveryScreen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});
export default OrderDeliveryScreen;
