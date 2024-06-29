import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderListScreen from '../ui/screen/Home/Order/OrderListScreen';

const OrderStack = createNativeStackNavigator();

const OrderStacks = () => {
  <OrderStack.Navigator>
    <OrderStack.Screen name="orderList" component={OrderListScreen} />
  </OrderStack.Navigator>;
};

export default OrderStacks;
