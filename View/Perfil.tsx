import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../Model/api'; 
import styles from '../Styles/styles';

const Perfil = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [estado, setEstado] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  
  // Verifica se o parâmetro userId está presente em route.params
  const { userId } = route.params || {}; 

  useEffect(() => {
    if (!userId) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        const userData = response.data;
        setNome(userData.nome);
        setEmail(userData.email);
        setConfirmEmail(userData.email);
        setCep(userData.cep);
        setCidade(userData.cidade);
        setRua(userData.rua);
        setEstado(userData.estado);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleCepChange = async (cep) => {
    setCep(cep);
    if (cep.length === 8) { // O CEP deve ter 8 dígitos
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setRua(data.logradouro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          Alert.alert('Erro', 'CEP inválido.');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        Alert.alert('Erro', 'Não foi possível buscar o endereço. Tente novamente.');
      }
    }
  };

  const handleSave = async () => {
    if (email !== confirmEmail) {
      Alert.alert('Erro', 'Os emails não coincidem.');
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !cep || !cidade || !rua || !estado) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      const response = await api.put(`/user/${userId}`, {
        nome,
        email,
        senha,
        cep,
        cidade,
        rua,
        estado,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar o perfil. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.containerCenter, styles.backgroundverdeEscuro]}>
      <View style={styles.windowRegister}>
        <ScrollView style={{ margin: 10 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginVertical: 30 }}>
            Edite suas informações abaixo
          </Text>
          <Text style={styles.textBlackRegular}> Nome Completo </Text>
          <TextInput style={styles.textInputBorder} value={nome} onChangeText={setNome} />
          <Text style={styles.textBlackRegular}> Email </Text>
          <TextInput style={styles.textInputBorder} value={email} onChangeText={setEmail} />
          <Text style={styles.textBlackRegular}> Confirme o Email </Text>
          <TextInput style={styles.textInputBorder} value={confirmEmail} onChangeText={setConfirmEmail} />
          <Text style={styles.textBlackRegular}> Senha (deixe em branco para não alterar) </Text>
          <TextInput style={styles.textInputBorder} secureTextEntry={true} value={senha} onChangeText={setSenha} />
          <Text style={styles.textBlackRegular}> Confirme a Senha </Text>
          <TextInput style={styles.textInputBorder} secureTextEntry={true} value={confirmSenha} onChangeText={setConfirmSenha} />
          <Text style={styles.textBlackRegular}> CEP </Text>
          <TextInput
            style={styles.textInputBorder}
            value={cep}
            onChangeText={handleCepChange}
            keyboardType="numeric"
          />
          <Text style={styles.textBlackRegular}> Rua </Text>
          <TextInput style={styles.textInputBorder} value={rua} onChangeText={setRua} editable={false} />
          <Text style={styles.textBlackRegular}> Cidade </Text>
          <TextInput style={styles.textInputBorder} value={cidade} onChangeText={setCidade} editable={false} />
          <Text style={styles.textBlackRegular}> Estado </Text>
          <TextInput style={styles.textInputBorder} value={estado} onChangeText={setEstado} editable={false} />

          <View style={styles.rowContainer}>
            <TouchableOpacity style={[styles.buttonVerde, { marginBottom: 20 }]} onPress={handleSave}>
              <Text style={styles.textWhite}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.textVerdeClaro, { fontWeight: 'bold' }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;
