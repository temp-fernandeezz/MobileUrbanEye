import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../components/NotificationContext';
import axios from 'axios';
import { api } from '../lib/api';

const Notificacoes = () => {
  const navigation = useNavigation();
  const { updateNotifications } = useNotifications();
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotificationList(response.data);
        updateNotifications(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();

    return () => {
      updateNotifications([]);
    };
  }, [updateNotifications]);

  const handleConfirm = async (notification) => {
    try {
      await api.post(`/notifications/confirm/${notification.report_id}`);
      // Atualizar a lista de notificações localmente
      setNotificationList(notificationList.filter(n => n.id !== notification.id));
    } catch (error) {
      console.error("Erro ao confirmar notificação:", error);
    }
  };

  const handleDelete = async (notification) => {
    try {
      await axios.post(`http://YOUR_BACKEND_URL/notifications/delete/${notification.report_id}`);
      // Atualizar a lista de notificações localmente
      setNotificationList(notificationList.filter(n => n.id !== notification.id));
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
    }
  };

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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={() => handleConfirm(notification)}
                >
                  <Text style={styles.textWhite}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => handleDelete(notification)}
                >
                  <Text style={styles.textWhite}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
      <TouchableOpacity
        style={styles.buttonVerde}
        onPress={() => navigation.goBack()}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonConfirm: {
    backgroundColor: '#006f4c',
  },
  buttonDelete: {
    backgroundColor: '#ff0000',
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
    backgroundColor: '#006f4c',
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
