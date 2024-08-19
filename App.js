import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './Controller/Rotas';


const App = () => {
  return (
    <NavigationContainer>
      <Rotas />
    </NavigationContainer>
  );
}

export default App;


//Direciona para a Rota criada em Rotas.js




