import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeMainScreen from '../ui/screen/Home/HomeMainScreen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderListScreen from '../ui/screen/Home/Order/OrderListScreen';
import WalletScreen from '../ui/screen/Home/WalletScreen';
import PersonTab from '../ui/screen/PersonTab';

const MyOrderIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="list" size={size} color={color} />;
};
const ProfileIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="user" size={size} color={color} />;
};
const BoxIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="box" size={size} color={color} />;
};
const WalletIcon = ({color, size}: {color: string; size: number}) => {
  return <Ionicons name="wallet-outline" size={size} color={color} />;
};
const HomeTab = createBottomTabNavigator();
const HomeTabs = (): React.ReactElement => {
  return (
    <HomeTab.Navigator
      initialRouteName="orderListTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          elevation: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      }}>
      <HomeTab.Screen
        name="orderListTab"
        component={OrderListScreen}
        options={({route}) => ({
          tabBarIcon: BoxIcon,
          tabBarLabel: 'Nhận đơn',
        })}
      />
      <HomeTab.Screen
        name="home_main1"
        component={HomeMainScreen}
        options={({route}) => ({
          tabBarIcon: MyOrderIcon,
          tabBarLabel: 'Đơn hàng',
        })}
      />
      <HomeTab.Screen
        name="home_main2"
        component={WalletScreen}
        options={({route}) => ({
          tabBarIcon: WalletIcon,
          tabBarLabel: 'Ví',
        })}
      />
      <HomeTab.Screen
        name="home_main3"
        component={PersonTab}
        options={({route}) => ({
          tabBarIcon: ProfileIcon,
          tabBarLabel: 'Tài xế',
        })}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabs;
