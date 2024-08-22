import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../Model/api'; // Certifique-se de que a configuração da API está correta
import styles from '../Styles/styles';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (email !== confirmEmail) {
      Alert.alert('Erro', 'Os emails não coincidem.');
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.post('/register', {
        nome,
        cpf,
        email,
        senha,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar se cadastrar. Tente novamente.');
    }
  };

  return (
    <SafeAreaView
      style={[styles.containerCenter, styles.backgroundverdeEscuro]}>
      <View style={styles.windowRegister}>
        <Text style={ { textAlign: 'center', fontWeight: 'bold', fontSize: 18,  marginVertical: 30}}> Preencha todos os campos para realizar seu cadastro</Text>
        <Text style={styles.textBlackRegular}> Nome Completo </Text>
        <TextInput style={styles.textInputBorder} value={nome} onChangeText={setNome} />
        <Text style={styles.textBlackRegular}> CPF </Text>
        <TextInput style={styles.textInputBorder} value={cpf} onChangeText={setCpf} />
        <Text style={styles.textBlackRegular}> Email </Text>
        <TextInput style={styles.textInputBorder} value={email} onChangeText={setEmail} />
        <Text style={styles.textBlackRegular}> Digite novamente o email </Text>
        <TextInput style={styles.textInputBorder} value={confirmEmail} onChangeText={setConfirmEmail} />
        <Text style={styles.textBlackRegular}> Senha</Text>
        <TextInput style={styles.textInputBorder} secureTextEntry={true} value={senha} onChangeText={setSenha} />
        <Text style={styles.textBlackRegular}> Digite novamente a senha </Text>
        <TextInput style={styles.textInputBorder} secureTextEntry={true} value={confirmSenha} onChangeText={setConfirmSenha} />

        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.buttonVerde, { marginBottom: 20 }]} onPress={handleRegister}>
            <Text style={styles.textWhite}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.textVerdeClaro, { fontWeight: 'bold' }]}>
            Já possui cadastro? Faça Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cadastro;
