import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/styles';

const BuscarLocais = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.backgroundverdeEscuro, { alignItems: 'center' }]}>
          <Text style={[styles.textWhite, { marginTop: '10%' }]}>
            Por favor faça a pesquisa com o CEP do local
          </Text>

          <TextInput style={styles.textInputCEP} placeholder="Digite seu CEP" />

          <TouchableOpacity style={[styles.buttonVerde, { marginBottom: 20 }]}>
            <Text style={styles.textWhite}>Pesquisar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backgroundClaro}>
          <View style={{ margin: 15 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
              {' '}
              Legenda{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default BuscarLocais;

// Inclui Mapa
