import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './lib/AuthContext';
import { NotificationProvider } from './components/NotificationContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Controller/DrawerNavigator';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { api } from './lib/api'; 

const Stack = createNativeStackNavigator();

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token) {
        sendTokenToServer(token);
      }
    });

    const locationInterval = setInterval(() => {
      checkUserLocation();
    }, 60000); // Verifica a cada 60 segundos

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    return () => {
      clearInterval(locationInterval);
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  async function checkUserLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização não concedida');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await api.post('/check-risk-area', {
        latitude: latitude,
        longitude: longitude,
        type: 'robberies'
      });

      if (response.data.message === 'Notificação enviada.') {
        console.log('Área de risco detectada, notificação enviada');
        sendPushNotifications(expoPushToken); // Enviar notificação
      } else {
        console.log('Fora da área de risco');
      }
    } catch (error) {
      console.error('Erro ao verificar localização:', error);
    }
  }

  async function sendPushNotifications(expoPushToken) {
    if (!expoPushToken) return;

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Notificação de Risco',
      body: 'Área de risco detectada! Fique atento.',
      data: { someData: 'goes here' },
    };

    try {
      let receipt = await Notifications.scheduleNotificationAsync({
        content: message,
        trigger: null,
      });
      console.log('Recebimento de Notificação:', receipt);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  }

  async function sendTokenToServer(token) {
    try {
      await api.post('/save-push-token', {
        token: token
      });
      console.log('Token de push salvo no servidor.');
    } catch (error) {
      console.error('Erro ao salvar o token no servidor:', error);
    }
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;

async function registerForPushNotificationsAsync() {
  console.log('Iniciando registro para notificações');
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falha ao obter permissão para notificações!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token de notificação:', token);
  } else {
    alert('Deve usar um dispositivo físico para notificações push');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
