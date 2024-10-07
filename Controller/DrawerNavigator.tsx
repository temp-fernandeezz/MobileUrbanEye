import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../View/TelaInicial';
import Notificacoes from '../View/Notificacoes';
import Perfil from '../View/Perfil';
import Login from '../View/Login';
import Cadastro from '../View/Cadastro';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="TelaInicial">
      <Drawer.Screen name="TelaInicial" component={TelaInicial} />
      <Drawer.Screen name="Notificacoes" component={Notificacoes} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastro" component={Cadastro} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
