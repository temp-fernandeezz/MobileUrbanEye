import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions for resetting the stack
import api from '../Model/api';

const Perfil = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      
      // Reset the navigation stack and navigate to the Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handlePasswordChange = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      try {
        await api.put('/user/change-password', { newPassword }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Senha alterada com sucesso');
      } catch (error) {
        console.error('Erro ao alterar a senha', error);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          try {
            const formData = new FormData();
            formData.append('profile_image', {
              uri: result.uri,
              type: 'image/jpeg',
              name: 'profile.jpg',
            });

            const response = await axios.post('http://localhost:8000/user/upload-image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });

            console.log('Imagem enviada com sucesso', response.data);
          } catch (error) {
            console.error('Erro ao enviar a imagem', error);
          }
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>Sem foto de perfil</Text>
      )}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Foto de Perfil</Text>
      </TouchableOpacity>
      <Text>Email: {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handlePasswordChange} style={styles.button}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  noImageText: {
    color: '#888',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Perfil;
