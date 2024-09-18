import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import NovaReclamacao from './NovaReclamacao';
import VizualizarReclamacao from './VizualizarReclamacao';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

import styles from '../Styles/styles';

const Tab = createMaterialTopTabNavigator();

const Logado = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
     <Header showX={true} showArrow={true} />
      
        <Tab.Navigator
          initialRouteName="Nova Reclamação"
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center',
            },
            tabBarItemStyle: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
            tabBarStyle: {
              backgroundColor: '#102519',
              elevation: 0,
            },
            tabBarIndicatorStyle: {
              backgroundColor: 'white',
            },
          }}
        >
          <Tab.Screen name="Nova Reclamação" component={NovaReclamacao} />
          <Tab.Screen name="Vizualizar Reclamações" component={VizualizarReclamacao} />
        </Tab.Navigator>


        <View style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>


          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../Images/editarPerfil.png')} style={{ width: 70, height: 70, marginTop: 20 }} />
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default Logado;
