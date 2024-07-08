import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from react-native-vector-icons

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Veiculos = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Array de opções para o menu
  const options = ["Caminhão 1", "Caminhão 2", "Caminhão 3", "Caminhão 4", "Caminhão 5", "Caminhão 6", "Caminhão 7", "Caminhão 8", "Caminhão 9", "Caminhão 10","Caminhão 11","Caminhão 12","Caminhão 13","Caminhão 14","Caminhão 15","Caminhão 16","Caminhão 17"];

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.scrollItem,
              selectedOption === option ? styles.selected : {}
            ]}
          >
            <Text style={styles.scrollItemText}>{option}</Text>
            <TouchableOpacity onPress={handleChevronPress}>
              <Icon name="chevron-right" size={15} color="#4682B4" style={styles.rightIcon} />
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
    backgroundColor: '#091015',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.12,
    marginTop: windowHeight * 0.12,
    backgroundColor: '#fff',
    padding: 20,
    width: windowWidth * 0.8,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    width: windowWidth * 0.7,
    maxHeight: windowHeight * 0.3,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  scrollItem: {
    width: '100%',
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#faffd6',
    alignItems: 'center', // Align items to center to position text between the icons
    flexDirection: 'row', // Add row direction to position icons and text in a row
    justifyContent: 'space-between', // Space between elements to place rightIcon at the end
  },
  selected: {
    borderColor: '#4682B4',
    borderWidth: 5,
    borderBottomWidth: 5,
  },
  scrollItemText: {
    fontSize: 16.3,
    color: '#faffd6',
    flex: 1, // Add flex to occupy space between the icons
    textAlign: 'left', // Align text to the left
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export default Veiculos;
