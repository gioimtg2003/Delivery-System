import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IdentityScreen from '../ui/screen/IdentityScreen';
import {IdentityScreenParamList} from '../types/ScreenParam';

const IdentityStack = createNativeStackNavigator<IdentityScreenParamList>();

const IdentityGroupStack = (): React.ReactElement => {
  return (
    <IdentityStack.Group>
      <IdentityStack.Screen
        name="identity"
        component={IdentityScreen}
        options={{
          headerTitle: 'Xác thực tài khoản',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <IdentityStack.Screen
        name="imgDriveLicense"
        component={IdentityScreen}
        options={{
          headerTitle: 'Xác thực tài khoản',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <IdentityStack.Screen
        name="imgVehicleRegistrationCert"
        component={IdentityScreen}
        options={{
          headerTitle: 'Xác thực tài khoản',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
        }}
      />
    </IdentityStack.Group>
  );
};

export default IdentityGroupStack;
