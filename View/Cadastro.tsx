import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../lib/api";
import styles from "../Styles/styles";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const navigation = useNavigation();

  const handleCepChange = async (cep) => {
    setCep(cep);
    if (cep.length === 8) {
      // O CEP deve ter 8 dígitos
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setRua(data.logradouro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          Alert.alert("Erro", "CEP inválido.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        Alert.alert(
          "Erro",
          "Não foi possível buscar o endereço. Tente novamente."
        );
      }
    }
  };

  const handleRegister = async () => {
    if (email !== confirmEmail) {
      Alert.alert("Erro", "Os emails não coincidem.");
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("/register", {
        nome,
        cpf,
        email,
        senha,
        cep,
        cidade,
        rua,
        estado,
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível realizar o cadastro. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar se cadastrar. Tente novamente."
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.containerCenter, styles.backgroundverdeEscuro]}
    >
      <View style={styles.windowRegister}>
        <ScrollView style={{ margin: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 30,
            }}
          >
            Preencha todos os campos para realizar seu cadastro
          </Text>
          <Text style={styles.textBlackRegular}> Nome Completo </Text>
          <TextInput
            style={styles.textInputBorder}
            value={nome}
            onChangeText={setNome}
          />
          <Text style={styles.textBlackRegular}> CPF </Text>
          <TextInput
            style={styles.textInputBorder}
            value={cpf}
            onChangeText={setCpf}
          />
          <Text style={styles.textBlackRegular}> CEP </Text>
          <TextInput
            style={styles.textInputBorder}
            value={cep}
            onChangeText={handleCepChange}
            keyboardType="numeric"
          />
          <Text style={styles.textBlackRegular}> Rua </Text>
          <TextInput
            style={styles.textInputBorder}
            value={rua}
            onChangeText={setRua}
            editable={false}
          />
          <Text style={styles.textBlackRegular}> Cidade </Text>
          <TextInput
            style={styles.textInputBorder}
            value={cidade}
            onChangeText={setCidade}
            editable={false}
          />
          <Text style={styles.textBlackRegular}> Estado </Text>
          <TextInput
            style={styles.textInputBorder}
            value={estado}
            onChangeText={setEstado}
            editable={false}
          />
          <Text style={styles.textBlackRegular}> Email </Text>
          <TextInput
            style={styles.textInputBorder}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.textBlackRegular}>
            {" "}
            Digite novamente o email{" "}
          </Text>
          <TextInput
            style={styles.textInputBorder}
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />
          <Text style={styles.textBlackRegular}> Senha</Text>
          <TextInput
            style={styles.textInputBorder}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
          <Text style={styles.textBlackRegular}>
            {" "}
            Digite novamente a senha{" "}
          </Text>
          <TextInput
            style={styles.textInputBorder}
            secureTextEntry={true}
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.buttonVerde, { marginBottom: 20 }]}
              onPress={handleRegister}
            >
              <Text style={styles.textWhite}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.textVerdeClaro, { fontWeight: "bold" }]}>
              Já possui cadastro? Faça Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Cadastro;
