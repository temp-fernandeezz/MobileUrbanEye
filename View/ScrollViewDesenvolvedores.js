import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const carouselDesenvolvedores = [
  {
    image: require('../Images/nycolasNeres.png'), 
    title: 'Claudio',
    text: 'Responsável pelo Designer do programa',
  },
  {
    image: require('../Images/nycolasNeres.png'), 
    title: 'Fernanda',
    text: 'Desenvolvedora Full Stack',
  },
  {
    image: require('../Images/nycolasNeres.png'), 
    title: 'Lais',
    text: 'Desenvolvedora Front End do Site',
  },
  {
    image: require('../Images/nycolasNeres.png'), 
    title: 'Nycolas',
    text: 'Responsável pela Coordenação do projeto',
  },
];

const CarouselItemDesenvolvedores = ({ item }) => (
  <View style={styles.carouselItem}>
    <Image source={item.image} style={styles.image} />
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
    <Text style={{ fontSize: 14, color: 'black' }}>{item.text}</Text>
  </View>
);

const CarrosselDesenvolvedores = () => {
  return (
    <ScrollView 
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
    >
      {carouselDesenvolvedores.map((item, index) => (
        <CarouselItemDesenvolvedores key={index} item={item} />
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  }
});

export default CarrosselDesenvolvedores;
