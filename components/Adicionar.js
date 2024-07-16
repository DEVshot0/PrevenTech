import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: windowWidth } = Dimensions.get('window');

const darkColors = {
  backgroundColor: '#091015',
  inputBackgroundColor: '#1e2a35',
  textColor: '#faffd6',
  borderColor: '#4682B4',
  placeholderColor: '#888',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  inputBackgroundColor: '#c2c2c2',
  textColor: '#091015',
  borderColor: '#4682B4',
  placeholderColor: '#091015',
};

const Adicionar = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [versao, setVersao] = useState('');
  const [ano, setAno] = useState('');
  const [isMarcaInput, setIsMarcaInput] = useState(false);
  const [isModeloInput, setIsModeloInput] = useState(false);
  const [isVersaoInput, setIsVersaoInput] = useState(false);
  const [isAnoInput, setIsAnoInput] = useState(false);

  const marcasModelosVersoes = {
    Volvo: {
      FH: ['FH 420', 'FH 460', 'FH 500'],
      FM: ['FM 370', 'FM 420', 'FM 470'],
      FMX: ['FMX 440', 'FMX 460'],
      FE: ['FE 250', 'FE 280'],
      FL: ['FL 210', 'FL 240'],
    },
    Scania: {
      'Série R': ['R 450', 'R 500', 'R 540'],
      'Série S': ['S 500', 'S 540'],
      'Série P': ['P 280', 'P 320', 'P 360'],
      'Série G': ['G 360', 'G 410'],
    },
    'Mercedes-Benz': {
      Actros: ['Actros 2651', 'Actros 2546'],
      Atego: ['Atego 1719', 'Atego 2426'],
      Axor: ['Axor 1933', 'Axor 2044'],
    },
    MAN: {
      TGX: ['TGX 29.480', 'TGX 29.440'],
      TGS: ['TGS 29.440', 'TGS 26.480'],
      TGM: ['TGM 23.290', 'TGM 26.290'],
      TGL: ['TGL 9.150', 'TGL 12.220'],
    },
    Iveco: {
      Stralis: ['Stralis 440', 'Stralis 480'],
      Trakker: ['Trakker 410', 'Trakker 480'],
      Eurocargo: ['Eurocargo 170E', 'Eurocargo 210E'],
      Daily: ['Daily 35S14', 'Daily 55C17'],
    },
    DAF: {
      XF: ['XF 105.460', 'XF 105.510'],
      CF: ['CF 85.410', 'CF 85.460'],
      LF: ['LF 45.210', 'LF 55.250'],
    },
    Renault: {
      'T High': ['T 440', 'T 480'],
      T: ['T 440', 'T 480'],
      C: ['C 430', 'C 480'],
      K: ['K 440', 'K 480'],
    },
    Ford: {
      Cargo: ['Cargo 1119', 'Cargo 2429'],
      'F-MAX': ['F-MAX'],
    },
    Freightliner: {
      Cascadia: ['Cascadia 113', 'Cascadia 125'],
      M2: ['M2 106', 'M2 112'],
      Coronado: ['Coronado 122', 'Coronado SD'],
    },
    Kenworth: {
      T680: ['T680'],
      T800: ['T800'],
      W900: ['W900'],
    },
    Peterbilt: {
      579: ['579'],
      389: ['389'],
      567: ['567'],
    },
    Mack: {
      Anthem: ['Anthem'],
      Pinnacle: ['Pinnacle'],
      Granite: ['Granite'],
    },
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1970 + 1), (val, index) => currentYear - index);

  const handleAdd = () => {
    Alert.alert('Adicionar', 'Caminhão adicionado com sucesso');
    navigation.goBack();
  };

  const renderPicker = (selectedValue, setSelectedValue, options, isInput, setIsInput, placeholder) => {
    if (!options) options = [];
    return (
      <>
        {isInput ? (
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBackgroundColor, color: colors.textColor, borderColor: colors.borderColor }]}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholderColor}
            value={selectedValue}
            onChangeText={setSelectedValue}
          />
        ) : (
          <Picker
            selectedValue={selectedValue}
            style={[styles.picker, { backgroundColor: colors.inputBackgroundColor, color: colors.textColor, borderColor: colors.borderColor }]}
            onValueChange={(itemValue) => {
              if (itemValue === 'add_new') {
                setIsInput(true);
                setSelectedValue('');
              } else {
                setSelectedValue(itemValue);
              }
            }}
          >
            <Picker.Item label={`Selecione ${placeholder}`} value="" />
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
            <Picker.Item label="Adicionar outro" value="add_new" />
          </Picker>
        )}
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={colors.textColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.textColor }]}>Adicionar Caminhão</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackgroundColor, color: colors.textColor, borderColor: colors.borderColor }]}
        placeholder="Placa"
        placeholderTextColor={colors.placeholderColor}
        value={placa}
        onChangeText={setPlaca}
      />
      {renderPicker(marca, setMarca, Object.keys(marcasModelosVersoes), isMarcaInput, setIsMarcaInput, 'Marca')}
      {renderPicker(modelo, setModelo, marca ? Object.keys(marcasModelosVersoes[marca] || {}) : [], isModeloInput, setIsModeloInput, 'Modelo')}
      {renderPicker(versao, setVersao, marca && modelo ? (marcasModelosVersoes[marca][modelo] || []) : [], isVersaoInput, setIsVersaoInput, 'Versão')}
      {renderPicker(ano, setAno, years.map(String), isAnoInput, setIsAnoInput, 'Ano de Fabricação')}
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    width: windowWidth * 0.8,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    width: windowWidth * 0.8,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Adicionar;
