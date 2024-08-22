import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={24}
        color="black"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'left',
    padding: 10,
    backgroundColor: 'black',
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 20,
  }
});

export default Header;


//Cabeçalho que aloca o hamburguer e a logo em todas as paginas