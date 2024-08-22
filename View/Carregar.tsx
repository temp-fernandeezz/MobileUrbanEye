import React from 'react';
import { SafeAreaView, ActivityIndicator, Image } from 'react-native';
import styles from '../Styles/styles';
import { StyleSheet } from 'react-native';

const Carregar = () => {
  return (
    <SafeAreaView style={{flex: 1,  alignItems: 'center', justifyContent: 'center', backgroundColor:'#002519'}}>
    
    <Image  style={{ width: '70%',height: undefined, aspectRatio: 1, alignSelf: 'center', backgroundColor: 'black' }}  source={require('../Images/UrbanEye.gif')}  resizeMode='contain'/>
  
 
      <ActivityIndicator size="large" color="#007a53" />


    
    </SafeAreaView>
  );
  
};

export default Carregar;

 //<Image  style={{ width: '80%', height: undefined, aspectRatio: 1, alignSelf: 'center', backgroundColor: 'black' }}  source={require('../Images/logo.jpg')}  resizeMode='contain'/>

//Função carregar onde configura o que aparecerá durante o carregamento

//style={[styles.containerCenter, { backgroundColor: '#102122' }]}

