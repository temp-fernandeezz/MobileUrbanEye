import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItemsInformacao = [
  {
    title: 'Sobre Nós',
    text: 'Com funcionalidades que incluem descrições, fotos e a localização exata, nosso objetivo é facilitar a comunicação de problemas urbanos e colaborar para um ambiente mais limpo e seguro. Através de um painel administrativo, as denúncias são analisadas cuidadosamente, sendo aprovadas ou rejeitadas conforme a necessidade.'
  },
  {
    title: 'Nossa Missão',
    text: 'Com funcionalidades que incluem descrições, fotos e a localização exata, nosso objetivo é facilitar a comunicação de problemas urbanos e colaborar para um ambiente mais limpo e seguro. Através de um painel administrativo, as denúncias são analisadas cuidadosamente, sendo aprovadas ou rejeitadas conforme a necessidade.'
  }
];

const CarouselItem = ({ item }) => (
  <View style={{ width: viewportWidth * 0.8, padding: 10, marginHorizontal: viewportWidth * 0.1 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
    <Text style={{ fontSize: 12, marginTop: 10, color: 'white' , textAlign: 'justify'}}>{item.text}</Text>
  </View>
);

const CarrosselInfoSobre = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      {carouselItemsInformacao.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default CarrosselInfoSobre;
