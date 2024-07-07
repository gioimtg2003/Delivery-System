import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {CustomerProvider} from './src/lib/context/context';
import {AuthProvider} from './src/lib/context/auth.context';
// app
function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <CustomerProvider>
        <AppNavigation />
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
