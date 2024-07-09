import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: windowWidth } = Dimensions.get('window');
const nome = "Gabiru"; // Defina o nome aqui

export default function Conta() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [localUri, setLocalUri] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    loadImageFromStorage();
    setGreeting(getGreeting());
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return `Bom dia, ${nome}`;
    } else if (currentHour < 18) {
      return `Boa tarde, ${nome}`;
    } else {
      return `Boa noite, ${nome}`;
    }
  };

  const loadImageFromStorage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('savedImageUri');
      if (savedUri) {
        setLocalUri(savedUri);
        setSelectedImage(savedUri);
      }
    } catch (error) {
      console.log('Erro ao carregar a imagem do armazenamento:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões de galeria para isso funcionar!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      saveImageLocally(result.assets[0].uri);
    }
  };

  const saveImageLocally = async (uri) => {
    const fileName = uri.split('/').pop();
    const newUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.copyAsync({
        from: uri,
        to: newUri
      });
      setLocalUri(newUri);
      await AsyncStorage.setItem('savedImageUri', newUri);
      console.log('Imagem salva localmente em:', newUri);
    } catch (error) {
      console.log('Erro ao salvar a imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <FontAwesome name="camera" size={40} color="#faffd6" />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.greetingText}>
        {greeting.split(', ')[0]}, <Text style={styles.boldText}>{nome}.</Text>
      </Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => alert('Conta')}>
          <FontAwesome name="user" size={24} color="#faffd6" />
          <Text style={styles.optionText}>Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Métodos de Pagamento')}>
          <FontAwesome name="credit-card" size={24} color="#faffd6" />
          <Text style={styles.optionText}>Métodos de Pagamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Configurações')}>
          <FontAwesome name="cog" size={24} color="#faffd6" />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Ajuda e Feedback')}>
          <FontAwesome name="question-circle" size={24} color="#faffd6" />
          <Text style={styles.optionText}>Ajuda e Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091015',
    alignItems: 'center',
    paddingTop: 50, // Adiciona um espaçamento no topo
    justifyContent: 'space-between',
  },
  photoContainer: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    borderRadius: (windowWidth * 0.6) / 2,
    borderWidth: 2,
    borderColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -10,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  greetingText: {
    color: '#faffd6',
    marginTop: -10,
    textAlign: 'center',
    fontSize: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#faffd6',
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#091015',
    borderTopWidth: 1,
    borderTopColor: '#4682B4',
    width: '100%',
    paddingHorizontal: 20,
  },
  optionText: {
    color: '#faffd6',
    marginLeft: 10,
    fontSize: 18,
  },
});
