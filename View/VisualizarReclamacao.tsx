import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from '../Styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';

const VizualizarReclamacao = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await api.get("/reports", {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionando o token ao cabeçalho
          },
        });
        
        // Armazena os relatórios em um estado ou realiza outra operação necessária
        console.log("Relatórios do usuário:", response.data);
      } catch (error) {
        console.error("Erro ao buscar relatórios:", error);
      }
    };
    
    // Chame a função para buscar os relatórios
    fetchUserReports();
    

  }, []);

  // Renderização condicional
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={reports}
      keyExtractor={(item) => item.id.toString()} // Ajuste se o seu ID não for numérico
      renderItem={({ item }) => (
        <View>
          <Text>{item.description}</Text> {/* Ajuste conforme os dados que você deseja exibir */}
        </View>
      )}
    />
  );
};
export default VizualizarReclamacao;
