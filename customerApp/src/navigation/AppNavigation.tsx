import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';
import {IPramListScreen} from '../lib/types/ParamListScreen';
import IntroScreen from '../ui/screen/Intro/Intro';
import Intro_1Screen from '../ui/screen/Intro/Intron_1';
import SignInScreen from '../ui/screen/SignInScreen';
import SignUpScreen from '../ui/screen/SignUpScreen';
import OTPScreen from '../ui/screen/OTPScreen';
import colors from '../lib/constant/color';
import HomeTabs from './HomeTab';
import OrderTransportScreen from '../ui/screen/home/OrderTransportScreen';
import OrderInfoScreen from '../ui/screen/home/OrderInfoScreen';
import OrderTrackingScreen from '../ui/screen/home/OrderTrackingScreen';
import TestScreen from '../ui/screen/TestScreen';

const Stack = createNativeStackNavigator<IPramListScreen>();

function AppNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="test"
          component={TestScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="intro"
          component={IntroScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="intro_1"
          component={Intro_1Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-in"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          component={SignUpScreen}
          options={{
            headerShown: true,
            animation: 'fade_from_bottom',
            headerBackVisible: true,
            headerBackTitleVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
            headerTitle: '',
          }}
          navigationKey="sign-up"
        />
        <Stack.Screen
          name="otp-screen"
          component={OTPScreen}
          options={{
            headerShown: true,
            animation: 'slide_from_right',
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerBackVisible: true,
            headerTitle: '',
            headerTintColor: colors.placeholder,
          }}
          navigationKey="otp-screen"
        />
        <Stack.Screen
          name="home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="transport"
          component={OrderTransportScreen}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Giao hàng',
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: 'bold',
              color: '#3a3a3a',
            },
            headerTitleAlign: 'left',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="order-info"
          component={OrderInfoScreen}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Thông tin đơn hàng',
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: 'bold',
              color: '#3a3a3a',
            },
            headerTitleAlign: 'left',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="orderTracking"
          component={OrderTrackingScreen}
          options={{
            animation: 'slide_from_right',
            headerTitle: 'Đơn hàng',
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: 'bold',
              color: '#3a3a3a',
            },
            headerTitleAlign: 'left',
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default AppNavigation;
