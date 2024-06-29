import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IdentityScreen from '../ui/screen/IdentityScreen';
import {IdentityScreenParamList} from '../types/ScreenParam';

const IdentityStack = createNativeStackNavigator<IdentityScreenParamList>();

const IdentityGroupStack = (): React.ReactElement => {
  return (
    <IdentityStack.Group
      screenOptions={{
        headerTitle: 'Xác thực tài khoản',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}>
      <IdentityStack.Screen name="identity" component={IdentityScreen} />
      <IdentityStack.Screen name="imgDriveLicense" component={IdentityScreen} />
      <IdentityStack.Screen
        name="imgVehicleRegistrationCert"
        component={IdentityScreen}
      />
    </IdentityStack.Group>
  );
};

export default IdentityGroupStack;
