import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../lib/api";
import { AuthContext } from "../lib/AuthContext";
import styles from "../Styles/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      console.log("Login response:", response.data);
      const { token, user } = response.data;
  
      if (user && token) {
        await AsyncStorage.setItem("token", token);
        login(user); // aqui você pode passar o userData se desejar
        navigation.navigate("TelaInicial");
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        "Email ou senha incorretos. Tente novamente.";
      Alert.alert("Erro", errorMessage);
    }
  };
  

  return (
    <SafeAreaView
      style={[styles.containerCenter, styles.backgroundverdeEscuro]}
    >
      <Image
        source={require("../Images/logo.jpg")}
        style={{ width: "60%", maxHeight: 200, resizeMode: "contain" }}
      />
      <View style={styles.windowsLogin}>
        <Text style={styles.textBlackRegular}>Login</Text>
        <TextInput
          style={styles.textInputBorder}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.textBlackRegular}>Senha</Text>
        <TextInput
          style={styles.textInputBorder}
          placeholder="*******"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.buttonVerde, { marginBottom: 20 }]}
            onPress={handleLogin}
          >
            <Text style={styles.textWhite}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={[styles.textVerdeClaro, { fontWeight: "bold" }]}>
            Ainda não possui cadastro?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
