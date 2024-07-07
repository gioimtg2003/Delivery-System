import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {DriverProvider} from './src/lib/context/Driver/Context';
import {AuthProvider} from './src/lib/context/auth.context';

const App = (): React.ReactElement => {
  return (
    <AuthProvider>
      <DriverProvider>
        <AppNavigation />
      </DriverProvider>
    </AuthProvider>
  );
};
export default App;
