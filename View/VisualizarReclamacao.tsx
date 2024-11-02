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
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });

        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar relatórios:", error);
        setError("Erro ao carregar as reclamações.");
        setLoading(false);
      }
    };

    fetchUserReports();
  }, []);

  const traduzirStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'recused':
        return 'Recusado';
      default:
        return status;
    }
  };

  const traduzirType = (type) => {
    switch (type) {
      case 'flood':
        return 'Alagamento';
      case 'illegal_dump':
        return 'Descarte Irregular';
      case 'robberies':
        return 'Assalto';
      default:
        return status;
    }
  };

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
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>Data: {new Date(item.created_at).toLocaleDateString()}</Text>
          <Text style={styles.reportText}>Status: {traduzirStatus(item.status)}</Text>
          <Text style={styles.reportText}>Tipo: {traduzirType(item.type)}</Text>
          <Text style={styles.reportText}>Endereço: {item.address}</Text>
          <Text style={styles.reportText}>CEP: {item.postal_code}</Text>
        </View>
      )}
    />
  );
};

export default VizualizarReclamacao;
