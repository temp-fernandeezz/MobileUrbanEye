import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './lib/AuthContext';
import { NotificationProvider } from './components/NotificationContext'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Controller/DrawerNavigator';
import Carregamento from './Controller/Carregamento';
import TelaInicial from './View/TelaInicial';
import Notificacoes from './View/Notificacoes';
import Login from './View/Login';
import Logado from './View/Logado';
import Perfil from './View/Perfil';
import Cadastro from './View/Cadastro';
import { useAuth } from './lib/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Carregamento" 
            screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'black' } }}
          >
            <Stack.Screen name="Carreg amento" component={Carregamento} />
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="Notificacoes" component={Notificacoes} />
            <Stack.Screen name="Logado" component={Logado} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;