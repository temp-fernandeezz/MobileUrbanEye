import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { api } from "../lib/api";
import styles from "../Styles/styles";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

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
  const [initialRegion, setInitialRegion] = useState(mapRegion);
  const [postal_code, setCep] = useState("");
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Status da permissão:", status);
      if (status !== "granted") {
        Alert.alert(
          "Permissão de Localização",
          "Permissão de localização negada."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Localização atual:", location);
      const currentRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setMapRegion(currentRegion);
      setInitialRegion(currentRegion);
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    const fetchApprovedLocations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/reports/approved-locations");
        setMarkers(response.data);
        setFilteredMarkers(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar os locais.");
        console.error("Erro ao buscar locais aprovados:", error);
      } finally {
        setLoading(false);
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
    setLoading(true);
    try {
      const response = await api.get("/location/search", {
        params: { postal_code: postal_code },
      });
      const data = response.data;

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
      setSearchPerformed(true);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Opa, parece que a forma de pesquisa de CEP está incorreta. Por favor, pesquise sem caracteres especiais."
      );
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetMap = () => {
    setMapRegion(initialRegion);
    setFilteredMarkers(markers);
    setCep("");
    setSearchPerformed(false);
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
            onPress={() => applyFilter(null)}
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

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {searchPerformed && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={resetMap}
            >
              <Text style={styles.textWhite}>Limpar Pesquisa</Text>
            </TouchableOpacity>
          )}
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
                  pinColor = "#28a745";
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaInicial;
