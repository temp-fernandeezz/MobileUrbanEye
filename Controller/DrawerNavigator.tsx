import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../View/TelaInicial';
import Header from '../components/Header';
import Login from '../View/Login';
import Cadastro from '../View/Cadastro';
import Perfil from '../View/Perfil'; 
import { AuthContext } from '../lib/AuthContext'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} title="Home" showX={true} showArrow={true} />,
      }}
    >
      <Drawer.Screen name="Tela Inicial" component={TelaInicial} />
      
      {isLoggedIn ? (
        <Drawer.Screen name="Perfil" component={Perfil} />
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastro" component={Cadastro} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
