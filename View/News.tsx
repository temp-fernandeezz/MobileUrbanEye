import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const Noticias = [
  {
    image: require('../Images/alagamentoAjuda.jpg'),
    title: 'Prevenção de Alagamentos. O que você pode fazer para ajudar!',
    tag1: 'Alagamentos',
    tag2: 'Prevenção',
    tag3: 'Meio-Ambiente',
    text: 'Sua reclamação ajuda a manter outras pessoas seguras. Ao realizar uma denúncia, nós marcamos o local e disponibilizamos para outros usuários consultarem os locais de risco e notificamos os usuários para que se mantenham seguros.',
  },
  {
    image: require('../Images/assalto.jpg'),
    title: 'Risco de assaltos, como evitar?',
    tag1: 'Assaltos',
    tag2: 'Violência',
    tag3: 'Prevenção',
    text: 'Com base nos assaltos notificados nos últimos dias, conseguimos mapear os locais com alto índice de periculosidade e criar alertas para deixar a população mais atenta durante horários de risco.',
  }
];

const CarrosselNoticias = ({ item }) => (
  <View style={[styles.carouselItem,  {marginLeft: 50}]}>
    <View style={styles.windowsNews}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.rowContainer}>
        <Text style={styles.tags}>{item.tag1}</Text>
        <Text style={styles.tags}>{item.tag2}</Text>
        <Text style={styles.tags}>{item.tag3}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <ScrollView>
      <Text style={styles.text}>{item.text}</Text>
      </ScrollView>
    </View>
  </View>
);

const News = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {Noticias.map((item, index) => (
        <CarrosselNoticias key={index} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
  },
  carouselItem: {
    width: viewportWidth * 0.7,
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    color: 'black',
    textAlign: 'justify',
    marginVertical: 5,
  },
  tags: {
    backgroundColor: '#A9A9A9',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  windowsNews: {
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    height: 500,
    
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap'
  },
});

export default News;
