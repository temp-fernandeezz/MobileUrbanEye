import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from './components/NotificationContext'; // Verifique o caminho
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Controller/DrawerNavigator'; // Verifique o caminho
import Carregamento from './Controller/Carregamento';
import TelaInicial from './View/TelaInicial';
import Notificacoes from './View/Notificacoes';
import Login from './View/Login';
import Logado from './View/Logado';
import Perfil from './View/Perfil';
import Cadastro from './View/Cadastro'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Carregamento" 
          screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'black' } }}
        >
          <Stack.Screen name="Carregamento" component={Carregamento} />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }} // Desative o cabeçalho aqui
          />
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="Notificacoes" component={Notificacoes} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Logado" component={Logado} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Cadastro" component={Cadastro}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
