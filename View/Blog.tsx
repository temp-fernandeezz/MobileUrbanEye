import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/styles';
import CarrosselNoticias from './News';

const Blog = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.backgroundverdeEscuro, { height: 200, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{color :  '#E3B873', fontSize: 26, fontStyle: 'italic', fontWeight: '400'}}>Confira nossas postagens</Text>

        </View>
        <View style={[styles.backgroundClaro, { alignItems: 'right' }]}>
        <CarrosselNoticias />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Blog;