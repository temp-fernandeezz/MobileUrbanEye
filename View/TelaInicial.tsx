import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { api } from "../lib/api"; // Importa a instância do Axios configurada
import styles from "../Styles/styles";
import CarrosselInfoSobre from "./ScrollViewSobre";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const TelaInicial = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [cep, setCep] = useState("");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchApprovedLocations = async () => {
      try {
        const response = await api.get("/reports/approved-locations");
        // console.log("Locais aprovados:", response.data); 
        setMarkers(response.data); 
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar os locais.");
        console.error("Erro ao buscar locais aprovados:", error);
      }
    };

    fetchApprovedLocations();
  }, []);

  const handleBuscarLocaisPress = () => {
    scrollViewRef.current.scrollTo({
      y: height + 400,
      animated: true,
    });
  };

  const buscarEnderecoPorCep = async () => {
    try {
      const response = await api.get(`/location/search`); 
      const data = response.data;

      if (data.erro) {
        Alert.alert(
          "CEP inválido",
          "Não foi possível encontrar um endereço para o CEP fornecido."
        );
        return;
      }

      const { latitude, longitude } = await obterCoordenadas(
        data.logradouro,
        data.localidade,
        data.uf
      );
      setMapRegion({ ...mapRegion, latitude, longitude });
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar o CEP.");
      console.error("Erro ao buscar CEP:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.backgroundBlack}>
          <ImageBackground
            source={require("../Images/fundoCidade.jpg")}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <View style={styles.overlayContainer}>
              <View style={styles.containerCenter}>
                <Text style={styles.textWhiteTitle}>UrbanEye</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.cepContainer}>
          <Text style={{ fontSize: 16, color: "black", marginVertical: 10 }}>
            Digite o CEP desejado para consultar os dados de risco da sua região
          </Text>

          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.cepInput, { marginRight: 5 }]}
              placeholder="Digite o CEP"
              keyboardType="numeric"
              value={cep}
              onChangeText={setCep}
            />
            <TouchableOpacity
              style={styles.cepButtonBuscar}
              onPress={buscarEnderecoPorCep}
            >
              <Text style={styles.textWhite}>Buscar CEP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
          >
            {markers.map((marker, index) => {
              let pinColor;
              let title;

              switch (marker.type) {
                case "illegal_dump":
                  pinColor = "orange";
                  title = "Descarte Irregular de Lixo";
                  break;
                case "robberies":
                  pinColor = "red";
                  title = "Assaltos";
                  break;
                case "flood":
                  pinColor = "darkblue";
                  title = "Área Alagada";
                  break;
              }

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                  }}
                  title={title}
                  pinColor={pinColor}
                />
              );
            })}
          </MapView>
        </View>

        <View style={styles.backgroundverdeEscuro}>
          <CarrosselInfoSobre />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaInicial;
