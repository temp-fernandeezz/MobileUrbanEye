import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "../components/NotificationContext";
import { api } from "../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const Notificacoes = () => {
  const navigation = useNavigation();
  const { updateNotifications } = useNotifications();
  const [notificationList, setNotificationList] = useState([]);
  const [respondedNotifications, setRespondedNotifications] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await api.get("/user-notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificationList(response.data);
        updateNotifications(response.data);

        const savedResponses = await AsyncStorage.getItem(
          "respondedNotifications"
        );
        if (savedResponses) {
          setRespondedNotifications(JSON.parse(savedResponses));
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleConfirm = async (notification) => {
    try {
      if (notification.id) {
        const token = await AsyncStorage.getItem("token");
        await api.post(`/notifications/confirm/${notification.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newResponses = {
          ...respondedNotifications,
          [notification.id]: "confirmado",
        };
        setRespondedNotifications(newResponses);
        await AsyncStorage.setItem("respondedNotifications", JSON.stringify(newResponses));
        
        // Atualizar a contagem de notificações
        const unreadCount = notificationList.filter(notif => !newResponses[notif.id]).length;
        setUnreadNotifications(unreadCount);
        
      } else {
        console.error("ID da notificação não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao confirmar notificação:", error);
    }
  };
  
  const handleReject = (notification) => {
    const newResponses = {
      ...respondedNotifications,
      [notification.id]: "rejeitado",
    };
    setRespondedNotifications(newResponses);
    AsyncStorage.setItem("respondedNotifications", JSON.stringify(newResponses));
  
    // Atualizar a contagem de notificações
    const unreadCount = notificationList.filter(notif => !newResponses[notif.id]).length;
    setUnreadNotifications(unreadCount);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationContainer}>
        {notificationList.length === 0 ? (
          <Text style={styles.textBlackRegular}>
            Nenhuma notificação encontrada.
          </Text>
        ) : (
          notificationList.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationBox,
                respondedNotifications[notification.id] && styles.responded,
              ]}
            >
              <Text style={styles.textBlackRegular}>
                Recebemos uma reclamação de assalto na sua região, poderia
                confirmar?
              </Text>
              <Text style={styles.textBlackRegular}>
                Local: {notification.address}, {notification.city} -{" "}
                {notification.postal_code}
              </Text>
              <Text style={styles.textBlackRegular}>
                Data: {new Date(notification.created_at).toLocaleString()}
              </Text>
              {respondedNotifications[notification.id] ? (
                <Text style={styles.textBlackRegular}>
                  {respondedNotifications[notification.id] === "confirmado"
                    ? "Obrigada por auxiliar a UrbanEye"
                    : "A UrbanEye agradece o retorno"}
                </Text>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonConfirm]}
                    onPress={() => handleConfirm(notification)}
                  >
                    <Text style={styles.textWhite}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() => handleReject(notification)}
                  >
                    <Text style={styles.textWhite}>Prefiro não participar</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    padding: 16,
  },
  notificationContainer: {
    flex: 1,
  },
  notificationBox: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  responded: {
    marginTop: 20,
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonConfirm: {
    backgroundColor: "green",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textBlackRegular: {
    marginTop: 20,
    color: "black",
  },
  textWhite: {
    color: "white",
  },
  buttonVerde: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Notificacoes;
