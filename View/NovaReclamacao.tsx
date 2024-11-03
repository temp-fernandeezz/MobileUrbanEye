import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  Modal,
  Button,
} from "react-native";
import styles from "../Styles/styles";
import { buscarEnderecoPorCep } from "../lib/SearchAddress";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../lib/api";

const NovaReclamacao = ({ navigation }) => {
  const [selectedComplaintType, setSelectedComplaintType] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [address, setaddress] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setcity] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const buscarEndereco = async () => {
      if (postal_code.length === 8) {
        setErro("");
        const resultado = await buscarEnderecoPorCep(postal_code);
        console.log("Resultado da busca:", resultado);
        if (resultado) {
          setaddress(resultado.logradouro || "");
          setBairro(resultado.bairro || "");
          setcity(resultado.localidade || "");
          setEstado(resultado.uf || "");
          console.log("Logradouro atualizado:", address);
        } else {
          setaddress("");
          setBairro("");
          setcity("");
          setEstado("");
          setErro("Erro ao buscar o endereço.");
        }
      }
    };

    buscarEndereco();
  }, [postal_code]);

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      if (selectedImage) {
        setImage(selectedImage);
      } else {
        alert("Erro ao obter a imagem. Tente novamente.");
      }
    } else {
      console.log("Seleção de imagem cancelada.");
    }
  };

  const handleEnviar = async () => {
    try {
      const formData = new FormData();
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("Erro: Token de autenticação não encontrado.");
        return;
      }

      formData.append("type", selectedComplaintType);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("postal_code", postal_code);
      formData.append("description", "Descrição da reclamação");

      if (image) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("image_path", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await api.post("/reports", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setModalVisible(true);
      } else {
        console.error("Erro ao enviar a reclamação:", response);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.rowContainer, { marginHorizontal: 10 }]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={styles.titleLogado}>Preencha os campos abaixo:</Text>

        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Código Postal: </Text>
          <TextInput
            style={styles.textInputNovaReclamacao}
            value={postal_code}
            onChangeText={setpostal_code}
            keyboardType="numeric"
            placeholder="Digite o CEP"
          />
        </View>

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Logradouro: </Text>
          <TextInput
            style={styles.textInputNovaReclamacao}
            value={address}
            placeholder="Logradouro"
            editable={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Bairro: </Text>
          <TextInput
            style={styles.textInputNovaReclamacao}
            value={bairro}
            placeholder="Bairro"
            editable={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Cidade: </Text>
          <TextInput
            style={styles.textInputNovaReclamacao}
            value={city}
            placeholder="Cidade"
            editable={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Estado: </Text>
          <TextInput
            style={styles.textInputNovaReclamacao}
            value={estado}
            placeholder="Estado"
            editable={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}> Tipo de Reclamação: </Text>

          <Picker
            selectedValue={selectedComplaintType}
            onValueChange={(itemValue) => setSelectedComplaintType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Assalto" value="robberies" />
            <Picker.Item label="Alagamento" value="flood" />
            <Picker.Item label="Descarte Irregular" value="illegal_dump" />
          </Picker>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBlackRegular}>Imagem do ocorrido:</Text>

          {!image && (
            <TouchableOpacity
              onPress={openGallery}
              style={[
                styles.buttonVerde,
                { marginTop: 10, paddingHorizontal: 20 },
              ]}
            >
              <Text style={styles.textWhite}>Selecionar Imagem</Text>
            </TouchableOpacity>
          )}

          {image && (
            <View style={styles.rowContainer}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.buttonVerde, { marginBottom: 20 }]}
          onPress={handleEnviar}
        >
          <Text style={styles.textWhite}>Enviar</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Agradecemos a reclamação, temos o prazo de uma semana para
                analisar sua reclamação
              </Text>
              <Button
                title="Fechar"
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("TelaInicial");
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaReclamacao;
