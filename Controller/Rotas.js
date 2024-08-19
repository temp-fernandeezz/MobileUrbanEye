import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Carregamento from './Carregamento';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <Stack.Navigator initialRouteName="Carregamento" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Carregamento" component={Carregamento} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default Rotas;



//Inicializa o app com a tela de carregamento em seguida direciona para a tela inicial, as demais rotas encontram-se em no hamburguer ( DrawerNavigator )
