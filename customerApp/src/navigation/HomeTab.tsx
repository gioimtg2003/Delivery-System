import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MainScreen from '../ui/screen/home/MainScreen';
import {IListParamTabHome} from '../lib/types/ParamListScreen';

const HomeTab = createBottomTabNavigator<IListParamTabHome>();

const MyOrderIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="list" size={size} color={color} />;
};
const ProfileIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="user" size={size} color={color} />;
};
const BoxIcon = ({color, size}: {color: string; size: number}) => {
  return <Feather name="box" size={size} color={color} />;
};

const HomeTabs = (): React.ReactElement => {
  return (
    <HomeTab.Navigator
      initialRouteName="order"
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
        name="order"
        component={MainScreen}
        options={({route}) => ({
          tabBarIcon: BoxIcon,
          tabBarLabel: 'Đặt hàng',
        })}
      />
      <HomeTab.Screen
        name="home_main1"
        component={MainScreen}
        options={({route}) => ({
          tabBarIcon: MyOrderIcon,
          tabBarLabel: 'Đơn hàng',
        })}
      />

      <HomeTab.Screen
        name="home_main3"
        component={MainScreen}
        options={({route}) => ({
          tabBarIcon: ProfileIcon,
          tabBarLabel: 'Cá nhân',
        })}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabs;
