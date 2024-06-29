import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {DriverProvider} from './src/lib/context/Driver/Context';

const App = (): React.ReactElement => {
  return (
    <DriverProvider>
      <AppNavigation />
    </DriverProvider>
  );
};
export default App;
