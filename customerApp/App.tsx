import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {CustomerProvider} from './src/lib/context/context';
// app
function App(): React.JSX.Element {
  return (
    <CustomerProvider>
      <AppNavigation />
    </CustomerProvider>
  );
}

export default App;
