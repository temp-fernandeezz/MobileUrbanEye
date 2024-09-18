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
import { api } from "../lib/api";
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
  const [postal_code, setCep] = useState("");
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    const fetchApprovedLocations = async () => {
      try {
        const response = await api.get("/reports/approved-locations");
        setMarkers(response.data);
        setFilteredMarkers(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar os locais.");
        console.error("Erro ao buscar locais aprovados:", error);
      }
    };

    fetchApprovedLocations();
  }, []);

  const applyFilter = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType) {
      const filtered = markers.filter((marker) => marker.type === filterType);
      setFilteredMarkers(filtered);
    } else {
      setFilteredMarkers(markers);
    }
  };

  const buscarEnderecoPorCep = async () => {
    try {
      const response = await api.get("/location/search", {
        params: { postal_code: postal_code },
      });
      const data = response.data;

      console.log("Dados do CEP:", data);

      if (data.error || !data.latitude || !data.longitude) {
        Alert.alert(
          "CEP inválido",
          "Não foi possível encontrar um endereço para o CEP fornecido."
        );
        return;
      }

      setMapRegion({
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar o CEP.");
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>
            Realize a pesquisa pela filtragem:
          </Text>
          <View style={styles.filterButtonsRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "illegal_dump" && styles.selectedFilter,
              ]}
              onPress={() => applyFilter("illegal_dump")}
            >
              <Text style={styles.textWhite}>Descarte Irregular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "robberies" && styles.selectedFilter,
              ]}
              onPress={() => applyFilter("robberies")}
            >
              <Text style={styles.textWhite}>Assalto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "flood" && styles.selectedFilter,
              ]}
              onPress={() => applyFilter("flood")}
            >
              <Text style={styles.textWhite}>Área Alagada</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={() => applyFilter(null)} // Limpa o filtro
          >
            <Text style={styles.textWhite}>Limpar Filtros</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, color: "black", marginVertical: 10 }}>
            ou digite o CEP desejado para consultar os dados de risco da sua
            região
          </Text>

          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.cepInput, { marginRight: 5 }]}
              placeholder="Digite o CEP"
              keyboardType="numeric"
              value={postal_code}
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
            {filteredMarkers.map((marker, index) => {
              let pinColor;
              let title;

              switch (marker.type) {
                case "illegal_dump":
                  pinColor = "brown";
                  title = "Descarte irregular";
                  break;
                case "robberies":
                  pinColor = "red";
                  title = "Assalto";
                  break;
                case "flood":
                  pinColor = "darkblue";
                  title = "Área Alagada";
                  break;
                default:
                  pinColor = "gray";
                  title = "Local";
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
