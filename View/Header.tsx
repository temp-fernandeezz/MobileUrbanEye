import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, hasNotifications }) => { // Adicione a prop hasNotifications
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
      <View style={styles.notificationContainer}>
        <Ionicons
          name="notifications-outline" // ou "notifications" para um ícone preenchido
          size={24}
          color="white"
          onPress={() => {
            // Adicione a ação para o ícone de notificações
          }}
          style={styles.icon}
        />
        {hasNotifications && <View style={styles.notificationDot} />} {/* Bolinha se houver notificações */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  notificationContainer: {
    position: 'relative', // Para o posicionamento da bolinha
  },
  notificationDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4, // Para fazer a bolinha
    backgroundColor: 'red', // Cor da bolinha
  },
});

export default Header;
