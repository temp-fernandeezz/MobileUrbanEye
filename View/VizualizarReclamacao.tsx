import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import styles from '../Styles/styles';


function obterMensagemReclamacao(reclamacao) {
  if (!reclamacao.dados || reclamacao.dados.trim() === "") {
    return "Nenhuma reclamação em aberto";
  } else {
    return "Reclamação: " + reclamacao.dados;
  }
}

const reclamacao = { dados: "" };

const VizualizarReclamacao = ({ navigation }) => {

  const mensagem = obterMensagemReclamacao(reclamacao);

  return (
    <SafeAreaView style={styles.rowContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.titleLogado}>{mensagem}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VizualizarReclamacao;
