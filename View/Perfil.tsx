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
import { api } from '../lib/api'; 
import styles from '../Styles/styles';

const Perfil = ({ route }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  const userId = route.params?.userId; 
  
  useEffect(() => {
    if (!userId) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        const userData = response.data;
        setUserInfo(userData);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSave = async () => {
    // Implementação da lógica de salvar se necessário
    // Você pode querer atualizar a lógica de salvar aqui se precisar modificar as informações do perfil.
  };

  if (!userInfo) {
    return (
      <SafeAreaView style={[styles.containerCenter, styles.backgroundverdeEscuro]}>
        <Text style={{ textAlign: 'center' }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.containerCenter, styles.backgroundverdeEscuro]}>
      <View style={styles.windowRegister}>
        <ScrollView style={{ margin: 10 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginVertical: 30 }}>
            Informações do Perfil
          </Text>
          
          <Text style={styles.textBlackRegular}> Nome Completo </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.nome} 
            editable={false} // Desabilitar edição
          />
          
          <Text style={styles.textBlackRegular}> Email </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.email} 
            editable={false} // Desabilitar edição
          />
          
          <Text style={styles.textBlackRegular}> CEP </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.cep} 
            editable={false} // Desabilitar edição
          />
          
          <Text style={styles.textBlackRegular}> Rua </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.rua} 
            editable={false} // Desabilitar edição
          />
          
          <Text style={styles.textBlackRegular}> Cidade </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.cidade} 
            editable={false} // Desabilitar edição
          />
          
          <Text style={styles.textBlackRegular}> Estado </Text>
          <TextInput 
            style={styles.textInputBorder} 
            value={userInfo.estado} 
            editable={false} // Desabilitar edição
          />

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
