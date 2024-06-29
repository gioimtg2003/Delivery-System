import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import SignInScreen from '../ui/screen/SignIn';
import SignUpScreen from '../ui/screen/SingUp';
import OrderDetailsScreen from '../ui/screen/Home/Order/OrderDetailsScreen';
import Toast from 'react-native-toast-message';
import AddWalletScreen from '../ui/screen/Home/AddWalletScreen';
import {AppScreenParamList} from '../types/ScreenParam';
import Warning from '../ui/component/Warning';
import OrderDeliveryScreen from '../ui/screen/Home/Order/OrderDeliveryScreen';
import PickupScreen from '../ui/screen/Home/Order/PickupScreen';
import DeliveryScreen from '../ui/screen/Home/Order/DeliveryScreen';
import IntroScreen from '../ui/screen/Intro';
import IdentityScreen from '../ui/screen/IdentityScreen';
import IdentityScreen1 from '../ui/screen/IdentityScreen1';
import IdentityScreen2 from '../ui/screen/IdentityScreen2';

const AppStack = createNativeStackNavigator<AppScreenParamList>();

const AppNavigation = (): React.ReactElement => {
  // const handleOffline = useCallback(() => {
  //   console.log('offline');
  //   if (
  //     state.driver?.OnlineStatus === 1 &&
  //     !state.driver?.idOrder &&
  //     state.driver?.Status === 'Free'
  //   ) {
  //     axiosInstance()
  //       .then(axios => {
  //         axios
  //           .put('/shipper/status', {
  //             online: false,
  //           })
  //           .then(res => {
  //             if (res.data.status === 'success') {
  //               console.log('offline success');
  //               BackgroundTimer.stop();
  //             }
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [state.driver]);
  // useEffect(() => {
  //   const onDestroySubscription = eventEmitter.addListener('onDestroy', () => {
  //     console.log('onDestroy');
  //     BackgroundTimer.setInterval(() => {
  //       handleOffline();
  //     }, 2000);
  //   });
  //   return () => {
  //     onDestroySubscription.remove();
  //   };
  // }, [handleOffline, state.driver]);
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="intro"
          component={IntroScreen}
          options={{
            headerShown: false,
          }}
        />
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
        <AppStack.Group
          screenOptions={{
            title: 'Xác thực tài khoản',
            headerTitleAlign: 'center',
          }}>
          <AppStack.Screen name="identity" component={IdentityScreen} />
          <AppStack.Screen name="imgDriveLicense" component={IdentityScreen1} />
          <AppStack.Screen
            name="imgVehicleRegistrationCert"
            component={IdentityScreen2}
          />
        </AppStack.Group>
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
        <AppStack.Screen
          name="pickupScreen"
          component={PickupScreen}
          options={{
            headerTitle: 'Đến điểm lấy hàng',
            headerTitleAlign: 'center',
            animation: 'fade_from_bottom',
          }}
        />
        <AppStack.Screen
          name="deliveryScreen"
          component={DeliveryScreen}
          options={{
            headerTitle: 'Đến điểm giao hàng',
            headerTitleAlign: 'center',
            animation: 'fade_from_bottom',
          }}
        />
      </AppStack.Navigator>

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
