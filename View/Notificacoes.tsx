import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Certifique-se de que o caminho está correto
import { useNotifications } from '../components/NotificationContext';
import { CommonActions } from '@react-navigation/native';


const Notificacoes = () => {
  const navigation = useNavigation();
  const { updateNotifications } = useNotifications();

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    // Lógica para verificar se há novas notificações
    const checkNotifications = async () => {
      // Exemplo de notificações
      const newNotifications = [
        { id: 1, title: 'Você está em uma área de Risco', message: 'Atualizado em 01/09/2024 10H06' },
        { id: 2, title: 'Você está em uma área de Risco', message: 'Atualizado em 04/09/2024 15H00' },
      ];
      setNotificationList(newNotifications);
      updateNotifications(newNotifications);
    };

    checkNotifications();

    return () => {
      updateNotifications([]); // Reseta quando sair da tela
    };
  }, [updateNotifications]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationContainer}>
        {notificationList.length === 0 ? (
          <Text style={styles.textBlackRegular}>Nenhuma notificação encontrada.</Text>
        ) : (
          notificationList.map((notification) => (
            <View key={notification.id} style={styles.notificationBox}>
              <Text style={styles.textBlackRegular}>{notification.title}</Text>
              <Text style={styles.textBlackMedium}>{notification.message}</Text>
            </View>
          ))
        )}
      </View>
      <TouchableOpacity
  style={styles.buttonVerde}
  onPress={() => navigation.dispatch(CommonActions.goBack())} // Navegação programática
>
  <Text style={styles.textWhite}>Retornar</Text>
</TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
    backgroundColor: '#DCDCDC',
    padding: 20,
  },
  notificationContainer: {
    flex: 1,
    maxWidth: '70%',
  },
  notificationBox: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#006f4c',
  },
  buttonVerde: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#006f4c', // Atualize para a cor desejada
  },
  textBlackRegular: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    width: '100%',
  },
  textBlackMedium: {
    fontSize: 14,
    color: 'black',
  },
  textWhite: {
    fontSize: 16,
    color: 'white',
  },
});

export default Notificacoes;
