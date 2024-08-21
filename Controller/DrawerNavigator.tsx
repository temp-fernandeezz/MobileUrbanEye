import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaInicial from '../View/TelaInicial';
import SobreNos from '../View/SobreNos';
import NovaReclamacao from '../View/NovaReclamacao';
import Blog from '../View/Blog';
import Login from '../View/Login';
import Cadastro from '../View/Cadastro';
import Perfil from '../View/Perfil'; // Importe a tela de perfil

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Se houver token, está autenticado
    };
    
    checkAuth();
  }, []);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TelaInicial} />
      <Drawer.Screen name="Sobre Nós" component={SobreNos} />
      <Drawer.Screen name="Nova Reclamação" component={NovaReclamacao} />
      <Drawer.Screen name="Blog" component={Blog} />
      {isAuthenticated ? (
        <Drawer.Screen name="Perfil" component={Perfil} />
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastre-se" component={Cadastro} />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
