import React from 'react';
import { View, StyleSheet, StatusBar, Alert, TouchableOpacity, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from './NotificationContext'; // Verifique se o caminho está correto

const Header = ({ showX = true, showArrow = true }) => {
  const navigation = useNavigation();
  const { hasNotifications } = useNotifications(); // Consome o contexto de notificações

  function handleOpenDrawer() {
    navigation.openDrawer();
  }
  
  function handleGoToAppHomepage() {
    navigation.navigate('Home');
  }


  const irParaNotificacoes = () => {
    // Navega para a tela de notificações
    navigation.navigate('Notificacoes');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#102519' />
      <View style={styles.container}>
        {showArrow && (
          <BorderlessButton onPress={handleOpenDrawer}>
            <Feather name="menu" size={24} color="#007a53" />
          </BorderlessButton>
        )}

        {/* Exibe o ícone de notificação se houver notificações */}
        {hasNotifications && (
          <TouchableOpacity onPress={irParaNotificacoes}>
            <Feather name="bell" size={24} color="#007a53" />
          </TouchableOpacity>
        )}


      </View>
    </>
  );
};

// Estilos para o componente Header
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#102519',
    paddingTop: StatusBar.currentHeight || 0, // Ajusta o padding-top para a altura da barra de status
  },
});

export default Header;
