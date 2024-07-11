import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '../contexts/ThemeContext';

const { width: windowWidth } = Dimensions.get('window');

const darkColors = {
  backgroundColor: '#091015',
  borderColor: '#4682B4',
  inactiveTintColor: '#faffd6',
  photoPlaceholderColor: '#ccc',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  borderColor: '#4682B4',
  inactiveTintColor: '#091015',
  photoPlaceholderColor: '#ccc',
};

export default function Conta({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [localUri, setLocalUri] = useState(null);
  const [greeting, setGreeting] = useState('');
  const isFocused = useIsFocused();
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    if (isFocused) {
      loadUserInfo();
      loadImageFromStorage();
    }
  }, [isFocused]);

  const loadUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        setUser(parsedInfo);
        setGreeting(getGreeting(parsedInfo.nome));
      }
    } catch (error) {
      console.log('Erro ao carregar informações do usuário:', error);
    }
  };

  const getGreeting = (nome) => {
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

    if (!result.cancelled) {
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
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <TouchableOpacity style={[styles.photoContainer, { borderColor: colors.borderColor }]} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.photo} />
        ) : (
          <View style={[styles.photoPlaceholder, { backgroundColor: colors.photoPlaceholderColor }]}>
            <FontAwesome name="camera" size={40} color={colors.inactiveTintColor} />
          </View>
        )}
      </TouchableOpacity>
      <Text style={[styles.greetingText, { color: colors.inactiveTintColor }]}>
        {greeting ? `${greeting.split(', ')[0]}, ` : ''}<Text style={styles.boldText}>{user.nome}.</Text>
      </Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Perfil')}>
          <FontAwesome name="user" size={24} color={colors.inactiveTintColor} />
          <Text style={[styles.optionText, { color: colors.inactiveTintColor }]}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Metodos')}>
          <FontAwesome name="credit-card" size={24} color={colors.inactiveTintColor} />
          <Text style={[styles.optionText, { color: colors.inactiveTintColor }]}>Métodos de Pagamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Config')}>
          <FontAwesome name="cog" size={24} color={colors.inactiveTintColor} />
          <Text style={[styles.optionText, { color: colors.inactiveTintColor }]}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Ajuda')}>
          <FontAwesome name="question-circle" size={24} color={colors.inactiveTintColor} />
          <Text style={[styles.optionText, { color: colors.inactiveTintColor }]}>Ajuda e Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  photoContainer: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    borderRadius: (windowWidth * 0.6) / 2,
    borderWidth: 2,
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
  },
  greetingText: {
    marginTop: -10,
    textAlign: 'center',
    fontSize: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
