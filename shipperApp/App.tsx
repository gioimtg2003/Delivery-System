import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/ui/screen/SingUp';
import SignInScreen from './src/ui/screen/SignIn';
const App = (): React.ReactElement => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
