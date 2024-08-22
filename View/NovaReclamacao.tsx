import React from 'react';
import { SafeAreaView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';

const NovaReclamacao = () => {
  const navigation = useNavigation();

  return (
    alert(' Você precisa fazer login para continuar',
    navigation.navigate('Login'))
  );
};

export default NovaReclamacao;