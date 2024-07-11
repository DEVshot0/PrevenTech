import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { UserContext } from '../contexts/UserContext';  // Corrigir o caminho de importação
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

const { width: windowWidth } = Dimensions.get('window');

const darkColors = {
  backgroundColor: '#091015',
  primaryColor: '#4682B4',
  textColor: '#faffd6',
  inputBackground: '#1e2a35',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  primaryColor: '#4682B4',
  textColor: '#091015',
  inputBackground: '#c2c2c2',
};

export default function Perfil({ navigation }) {
  const { user, setUser } = useContext(UserContext);  // Usar corretamente o contexto
  const [nome, setNome] = useState(user.nome);
  const [sobrenome, setSobrenome] = useState(user.sobrenome);
  const [numero, setNumero] = useState(user.numero);
  const [cep, setCep] = useState(user.cep);
  const [cidade, setCidade] = useState(user.cidade);
  const [estado, setEstado] = useState(user.estado);
  const [rua, setRua] = useState(user.rua);
  const [bairro, setBairro] = useState(user.bairro);
  const [numeroResidencia, setNumeroResidencia] = useState(user.numeroResidencia);

  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    loadInformation();
  }, []);

  const loadInformation = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        setNome(parsedInfo.nome);
        setSobrenome(parsedInfo.sobrenome);
        setNumero(parsedInfo.numero);
        setCep(parsedInfo.cep);
        setCidade(parsedInfo.cidade);
        setEstado(parsedInfo.estado);
        setRua(parsedInfo.rua);
        setBairro(parsedInfo.bairro);
        setNumeroResidencia(parsedInfo.numeroResidencia);
        setUser(parsedInfo); // Atualiza o estado global
      }
    } catch (error) {
      console.log('Erro ao carregar as informações:', error);
    }
  };

  const handleCepChange = (text) => {
    setCep(text);
  };

  const fetchAddress = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setCidade(data.localidade);
        setEstado(data.uf);
        setRua(data.logradouro);
        setBairro(data.bairro);
      } catch (error) {
        console.log('Erro ao buscar o CEP:', error);
      }
    }
  };

  const saveInformation = async () => {
    const userInfo = {
      nome,
      sobrenome,
      numero,
      cep,
      cidade,
      estado,
      rua,
      bairro,
      numeroResidencia,
    };
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUser({ ...user, nome }); // Atualiza o estado do contexto
      alert('Informações salvas com sucesso!');
      navigation.navigate('Home', { nome }); // Navega para 'Home'
    } catch (error) {
      console.log('Erro ao salvar as informações:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#000' : colors.backgroundColor} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colors.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textColor }]}>Perfil</Text>
      </View>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primaryColor }]} onPress={saveInformation}>
        <FontAwesome name="save" size={24} color={colors.textColor} />
        <Text style={[styles.saveButtonText, { color: colors.textColor }]}>Salvar Informações</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Nome</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Sobrenome</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={sobrenome}
          onChangeText={setSobrenome}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Número</Text>
        <View style={styles.numberInputContainer}>
          <Text style={[styles.flag, { color: colors.textColor }]}>🇧🇷 +55</Text>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
            value={numero}
            onChangeText={setNumero}
            placeholder='(xx) _____-____'
            placeholderTextColor={colors.placeholderTextColor}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>CEP</Text>
        <View style={styles.cepContainer}>
          <TextInput
            style={[styles.input, styles.cepInput, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
            value={cep}
            onChangeText={handleCepChange}
            keyboardType='numeric'
            placeholderTextColor={colors.placeholderTextColor}
          />
          <TouchableOpacity style={[styles.cepButton, { backgroundColor: colors.primaryColor }]} onPress={fetchAddress}>
            <Text style={[styles.cepButtonText, { color: colors.textColor }]}>Buscar CEP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Cidade</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={cidade}
          onChangeText={setCidade}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Estado</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={estado}
          onChangeText={setEstado}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Rua</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={rua}
          onChangeText={setRua}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Bairro</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={bairro}
          onChangeText={setBairro}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.textColor }]}>Número</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
          value={numeroResidencia}
          onChangeText={setNumeroResidencia}
          keyboardType='numeric'
        />
      </View>
      <TouchableOpacity style={[styles.changePasswordButton, { backgroundColor: colors.primaryColor }]} onPress={() => alert('Alterar senha')}>
        <FontAwesome name="key" size={24} color={colors.textColor} />
        <Text style={[styles.changePasswordText, { color: colors.textColor }]}>Alterar sua senha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputContainer: {
    width: windowWidth * 0.9,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    marginRight: 10,
    fontSize: 16,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cepInput: {
    flex: 0.5,
  },
  cepButton: {
    flex: 0.5,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cepButtonText: {
    fontSize: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  changePasswordText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
