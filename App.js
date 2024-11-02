import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './lib/AuthContext';
import { NotificationProvider } from './components/NotificationContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Controller/DrawerNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;