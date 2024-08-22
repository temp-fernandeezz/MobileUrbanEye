import React from 'react';
import { SafeAreaView, ScrollView, ImageBackground, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarrosselDesenvolvedores from './ScrollViewDesenvolvedores';
import styles from '../Styles/styles';

const SobreNos = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.backgroundBlack}>
          <ImageBackground
            source={require('../Images/CidadeBonita.jpg')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 400,
              opacity: 0.9,
            }}
            resizeMode="cover"
          >
            <View
              style={{
                width: '80%',
                height: 350,
                borderWidth: 3,
                borderColor: '#006f4c',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={styles.containerCenter}>
                <Text style={styles.textGreenTitle}>UrbanEye</Text>
                <Text style={styles.textWhite}>
                  Uma ideia universitária para um mundo melhor
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.backgroundverdeEscuro}>
          <Text
            style={[
              styles.textWhite,
              { marginHorizontal: 30, textAlign: 'center', marginVertical: 20 },
            ]}
          >
            Durante a graduação, quatro amigos se reuniram para desenvolver um
            site inovador com o objetivo de facilitar a denúncia de áreas de
            risco, como alagamentos, descarte irregular de lixo, assaltos, furtos,
            entre outros problemas que ocorram em suas cidades. A plataforma
            permite que os usuários registrem denúncias detalhadas sobre esses
            problemas, incluindo descrições, fotos e a localização exata. Após a
            submissão, as denúncias são analisadas por um painel administrativo
            que possui funcionalidades para aprovar ou rejeitar as reclamações.
          </Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Text
            style={{ color: 'black', textAlign: 'center', fontSize: 18, marginHorizontal: 30 }}
          >
            Conheça os responsáveis pelo projeto
          </Text>
          <View style={styles.rowContainer}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, marginHorizontal: 30 }}>
              {'<'}
            </Text>
            <CarrosselDesenvolvedores />
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, marginHorizontal: 30 }}>
              {'>'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SobreNos;
