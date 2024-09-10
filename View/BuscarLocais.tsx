import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import api from "../Model/api";

type MarkerData = {
  latitude: number;
  longitude: number;
  description: string;
  type: string;
};

const BuscarLocais = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: -23.55052, // Coordenadas iniciais para São Paulo
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadApprovedLocations();
    const interval = setInterval(loadApprovedLocations, 30000); // Recarregar locais a cada 30 segundos
    return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
  }, []);

  const loadApprovedLocations = async () => {
    try {
      const response = await api.get("/reports/approved-locations");
      const data = response.data;

      if (Array.isArray(data)) {
        const validMarkers = data
          .filter((report) =>
            isValidCoordinate(report.latitude, report.longitude)
          )
          .map((report) => ({
            latitude: Number(report.latitude),
            longitude: Number(report.longitude),
            description: report.description,
            type: report.type,
          }));
        setMarkers(validMarkers);
      } else {
        console.error("Dados inválidos recebidos da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar localizações aprovadas:", error);
    }
  };

  const handleSearch = async () => {
    try {
      console.log(`Pesquisando por CEP: ${searchTerm}`); // Debug

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=AIzaSyBn0Hr_x0v-_EhdIbcEbF_H_AKEuqbMcLc`
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;

        console.log("Resposta da API do Google para pesquisa:", location); // Debug

        const latitude = location.lat;
        const longitude = location.lng;

        if (isValidCoordinate(latitude, longitude)) {
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01, // Zoom mais próximo ao pesquisar um local
            longitudeDelta: 0.01,
          };

          setMapRegion(newRegion); // Atualiza a região do mapa

          setMarkers([
            {
              latitude,
              longitude,
              description: data.results[0].formatted_address,
              type: "default", // Tipo padrão para pesquisa
            },
          ]);
        } else {
          console.error("Coordenadas inválidas recebidas da API:", data);
          setModalVisible(true);
        }
      } else {
        console.error("Nenhum resultado encontrado para o CEP:", searchTerm);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Erro ao buscar local:", error);
      setModalVisible(true);
    }
  };

  const isValidCoordinate = (lat, lng) => {
    return (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  // Função para traduzir o tipo para exibição no marcador
  const getTypeTranslation = (type) => {
    switch (type) {
      case "robberies":
        return "Assalto";
      case "theft":
        return "Furto";
      case "illegal_dump":
        return "Descarte irregular";
      default:
        return "Outro";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <Text style={styles.instructions}>
            *Por favor, faça a pesquisa pelo CEP (Código Postal) do local.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Pesquise o local desejado"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          region={mapRegion} // Atualize a região do mapa
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={getTypeTranslation(marker.type)} // Mostrar o tipo traduzido
              pinColor={getMarkerColor(marker.type)}
            />
          ))}

          {markers
            .filter((marker) => marker.type === "robberies")
            .map((marker, index) => (
              <Circle
                key={index}
                center={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                radius={600}
                strokeColor="#00261a"
                fillColor="rgba(0, 38, 26, 0.35)"
              />
            ))}
        </MapView>

        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legenda:</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "red" }]} />
            <Text style={styles.legendText}>Assaltos</Text>
          </View>
          {/* <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "orange" }]} />
            <Text style={styles.legendText}>Furto</Text>
          </View> */}
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "green" }]} />
            <Text style={styles.legendText}>Descarte Irregular</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "blue" }]} />
            <Text style={styles.legendText}>Área de Alagamentos</Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Opa, não temos informações sobre este local ainda.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getMarkerColor = (type) => {
  switch (type) {
    case "robberies":
      return "red";
    case "theft":
      return "orange";
    case "illegal_dump":
      return "green";
    default:
      return "blue";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: '#00261a',
    padding: 20,
  },
  instructions: {
    color: "white",
    marginBottom: 8,
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
  },
  map: {
    width: "100%",
    height: 500,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: "red",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
  legendContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
  },
  legendTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 14,
  },
});

export default BuscarLocais;