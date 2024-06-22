import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import SignInScreen from '../ui/screen/SignIn';
import SignUpScreen from '../ui/screen/SingUp';
import OrderDetailsScreen from '../ui/screen/Home/Order/OrderDetailsScreen';
import Toast from 'react-native-toast-message';
import {useDriver} from '../lib/context/Driver/Context';
const Stack = createNativeStackNavigator();

const AppNavigation = (): React.ReactElement => {
  const {state} = useDriver();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!state.isAuth ? (
          <>
            <Stack.Screen
              name="login"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              component={SignUpScreen}
              options={{
                title: 'Đăng ký tài khoản',
                headerBackTitle: 'Đăng nhập',
                headerBackTitleVisible: true,
                headerBackTitleStyle: {fontSize: 16},
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="orderDetails"
              component={OrderDetailsScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
          </>
        )}

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
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigation;
