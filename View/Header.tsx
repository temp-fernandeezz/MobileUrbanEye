import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={24}
        color="white"
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Ionicons
        name="notifications-outline"  // ou "notifications" para um ícone preenchido
        size={24}
        color="black"
        onPress={() => {
          // Adicione a ação para o ícone de notificações
        }}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',  // Alinha itens verticalmente no centro
    justifyContent: 'space-between',  // Distribui o espaço entre os itens
    padding: 10,
    backgroundColor: 'black',
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
