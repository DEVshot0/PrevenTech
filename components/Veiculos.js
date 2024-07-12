import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../contexts/ThemeContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const darkColors = {
  backgroundColor: '#091015',
  borderColor: '#4682B4',
  inactiveTintColor: '#faffd6',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  borderColor: '#4682B4',
  inactiveTintColor: '#091015',
};

const Veiculos = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  // Array de opções para o menu
  const options = ["Caminhão 1", "Caminhão 2", "Caminhão 3", "Caminhão 4", "Caminhão 5", "Caminhão 6", "Caminhão 7", "Caminhão 8", "Caminhão 9", "Caminhão 10", "Caminhão 11", "Caminhão 12", "Caminhão 13", "Caminhão 14", "Caminhão 15", "Caminhão 16", "Caminhão 17"];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleChevronPress = () => {
    if (!selectedOption) {
      Alert.alert("Atenção", "Selecione uma das opções antes de prosseguir.");
    } else {
      console.log("direcionado para Cadastro.js");
      navigation.navigate('Cadastro');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <ScrollView style={styles.scrollView}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.scrollItem,
              { borderBottomColor: colors.inactiveTintColor },
              selectedOption === option ? { borderColor: colors.borderColor, borderWidth: 5 } : {}
            ]}
          >
            <Text style={[styles.scrollItemText, { color: colors.inactiveTintColor }]}>{option}</Text>
            <TouchableOpacity onPress={handleChevronPress}>
              <Icon name="chevron-right" size={15} color={colors.borderColor} style={styles.rightIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  scrollItem: {
    width: '100%',
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 0.7,
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  scrollItemText: {
    fontSize: 16.3,
    flex: 1,
    textAlign: 'left', 
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export default Veiculos;
