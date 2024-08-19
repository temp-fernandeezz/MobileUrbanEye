import React, { useState, useEffect } from 'react';
import Carregar from '../View/Carregar';


const Carregamento = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('DrawerNavigator');
    }, 5000); // Tempo de carregamento
  }, [navigation]);

  return (
    isLoading ? <Carregar /> : null
  );
};

export default Carregamento;



//Carregamento que chama a função carregar e tem um tempo de execução de  segundos, em seguida chama o hamburguer com as rotas
