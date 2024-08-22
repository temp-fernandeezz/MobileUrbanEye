import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Model/api'; // Certifique-se de que este arquivo contém a configuração da API.
import styles from '../Styles/styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;

      // Armazenar o token no AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Navegar para a próxima tela (ajuste conforme necessário)
      navigation.navigate('Perfil');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha incorretos. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.containerCenter, styles.backgroundverdeEscuro]}>
      <Image
        source={require('../Images/logo.png')}
        style={{ width: '60%', maxHeight: 200, resizeMode: 'contain' }}
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
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
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
          <Text style={[styles.textVerdeClaro, { fontWeight: 'bold' }]}>
            Ainda não possui cadastro?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
