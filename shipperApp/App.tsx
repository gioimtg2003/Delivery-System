import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/ui/screen/Login';
import SignUpScreen from './src/ui/screen/SingUp';
const App = (): React.ReactElement => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{
            title: 'Đăng ký tài khoản',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
