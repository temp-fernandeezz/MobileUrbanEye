import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, View, ActivityIndicator, Alert, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TelaInicial from "../View/TelaInicial";
import Notificacoes from "../View/Notificacoes";
import Perfil from "../View/Perfil";
import Login from "../View/Login";
import Cadastro from "../View/Cadastro";
import { useNotifications } from "../components/NotificationContext"; // Para lidar com o ponto verde de notificações
import NovaReclamacao from "../View/NovaReclamacao";
import VisualizarReclamacao from "../View/VisualizarReclamacao";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { unreadNotifications } = useNotifications(); // Recebe a contagem de notificações não lidas
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Estado atualizado para boolean | null

  // Verificar se o usuário está autenticado
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Busca o token armazenado
        setIsAuthenticated(!!token); // Atualiza o estado com base na existência do token
      } catch (error) {
        console.error("Erro ao verificar token de autenticação:", error);
      }
    };

    checkLoginStatus();
  }, []); // Executa apenas uma vez na montagem do componente

  // Função de logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token"); // Remove o token do AsyncStorage
    await AsyncStorage.removeItem("user_id"); // Remove o user_id, se você estiver salvando
    setIsAuthenticated(false); // Atualiza o estado para refletir que o usuário não está mais autenticado
    Alert.alert("Logout", "Você foi desconectado com sucesso.");
  };

  // Exibir um indicador de loading enquanto verifica o estado de autenticação
  if (isAuthenticated === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="TelaInicial"
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
            <View>
              <Icon
                name="notifications-outline"
                size={25}
                style={{ marginRight: 15 }}
              />
              {/* Exibir ponto verde apenas se houver notificações não lidas */}
              {unreadNotifications > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: 5,
                    backgroundColor: "green",
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{ drawerLabel: "Tela Inicial" }}
      />

      {/* Renderizar telas de Notificações e Perfil apenas se o usuário estiver autenticado */}
      {isAuthenticated && (
        <>
          <Drawer.Screen name="Notificacoes" component={Notificacoes} options={{ drawerLabel: "Notificações" }}/>
          <Drawer.Screen name="VisualizarReclamacao" component={VisualizarReclamacao} options={{ drawerLabel: "Visualizar Reclamações" }} />
          <Drawer.Screen name="NovaReclamacao" component={NovaReclamacao} options={{ drawerLabel: "Nova Reclamação" }}/>
          
          {/* Adicionando o botão de Logout no cabeçalho */}
          <Drawer.Screen
            name="Logout"
            options={{ drawerLabel: "Sair" }}
            component={() => (
              <TouchableOpacity onPress={handleLogout}>
                <View style={{ padding: 20 }}>
                  <Text style={{ fontSize: 18, color: "red" }}>Sair</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* As telas de Login e Cadastro estarão sempre disponíveis */}
      {!isAuthenticated && (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastro" component={Cadastro} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
