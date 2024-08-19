import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../View/TelaInicial';
import SobreNos from '../View/SobreNos';
import NovaReclamacao from '../View/NovaReclamacao';
import Blog from '../View/Blog';
import Login from '../View/Login';
import Cadastro from '../View/Cadastro';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TelaInicial} />
      <Drawer.Screen name="Sobre Nós" component={SobreNos} />
      <Drawer.Screen name="Nova Reclamação" component={NovaReclamacao} />
      <Drawer.Screen name="Blog" component={Blog} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastre-se" component={Cadastro} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;


//Hamburguer que dá acesso as paginas disponiveis e suas rotas