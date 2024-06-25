import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import SignInScreen from '../ui/screen/SignIn';
import SignUpScreen from '../ui/screen/SingUp';
import OrderDetailsScreen from '../ui/screen/Home/Order/OrderDetailsScreen';
import Toast from 'react-native-toast-message';
import {useDriver} from '../lib/context/Driver/Context';
import AddWalletScreen from '../ui/screen/Home/AddWalletScreen';
import {AppScreenParamList} from '../types/ScreenParam';
import Warning from '../ui/component/Warning';
import OrderDeliveryScreen from '../ui/screen/Home/Order/OrderDeliveryScreen';
const AppStack = createNativeStackNavigator<AppScreenParamList>();
const AppNavigation = (): React.ReactElement => {
  const {state} = useDriver();
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {state.isAuth === true ? (
          <AppStack.Group>
            <AppStack.Screen
              name="home"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
            <AppStack.Screen
              name="orderDetails"
              component={OrderDetailsScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
            <AppStack.Screen
              name="AddWalletScreen"
              component={AddWalletScreen}
              options={{
                headerTitle: 'Nạp tiền',
                animation: 'slide_from_right',
              }}
            />
            <AppStack.Screen
              name="orderDelivery"
              component={OrderDeliveryScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
          </AppStack.Group>
        ) : (
          <AppStack.Group>
            <AppStack.Screen
              name="login"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <AppStack.Screen
              name="signup"
              component={SignUpScreen}
              options={{
                title: 'Đăng ký tài khoản',
                headerBackTitle: 'Đăng nhập',
                headerBackTitleVisible: true,
                headerBackTitleStyle: {fontSize: 16},
              }}
            />
          </AppStack.Group>
        )}
      </AppStack.Navigator>
      {/* <Stack.Group
          screenOptions={{
            headerTitle: 'Xác thực tài khoản',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name="identity" component={IdentityScreen} />
          <Stack.Screen name="imgDriveLicense" component={IdentityScreen} />
          <Stack.Screen
            name="imgVehicleRegistrationCert"
            component={IdentityScreen}
          />
        </Stack.Group> */}

      {/* <Stack.Screen name="identity" component={IdentityScreen} />
          <Stack.Screen name="imgDriveLicense" component={IdentityScreen} />
          <Stack.Screen
            name="imgVehicleRegistrationCert"
            component={IdentityScreen}
          /> */}
      <Warning />
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigation;