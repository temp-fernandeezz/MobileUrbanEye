import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../View/TelaInicial';
import Header from '../components/Header';
import Login from '../View/Login';
import Cadastro from '../View/Cadastro';
import Notificacoes from '../View/Notificacoes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} title="Home" showX={true} showArrow={true} />,
      }}
    >
      <Drawer.Screen name="TelaInicial" component={TelaInicial} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastro" component={Cadastro}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
