import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { UserContext } from '../contexts/UserContext';  // Corrigir o caminho de importação

const { width: windowWidth } = Dimensions.get('window');

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TouchableOpacity style={styles.saveButton} onPress={saveInformation}>
        <FontAwesome name="save" size={24} color="#faffd6" />
        <Text style={styles.saveButtonText}>Salvar Informações</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          value={sobrenome}
          onChangeText={setSobrenome}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número</Text>
        <View style={styles.numberInputContainer}>
          <Text style={styles.flag}>🇧🇷 +55</Text>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder='(xx) _____-____'
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP</Text>
        <View style={styles.cepContainer}>
          <TextInput
            style={[styles.input, styles.cepInput]}
            value={cep}
            onChangeText={handleCepChange}
            keyboardType='numeric'
          />
          <TouchableOpacity style={styles.cepButton} onPress={fetchAddress}>
            <Text style={styles.cepButtonText}>Buscar CEP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rua</Text>
        <TextInput
          style={styles.input}
          value={rua}
          onChangeText={setRua}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={numeroResidencia}
          onChangeText={setNumeroResidencia}
          keyboardType='numeric'
        />
      </View>
      <TouchableOpacity style={styles.changePasswordButton} onPress={() => alert('Alterar senha')}>
        <FontAwesome name="key" size={24} color="#faffd6" />
        <Text style={styles.changePasswordText}>Alterar sua senha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#091015',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: '#faffd6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: windowWidth * 0.9,
    marginBottom: 20,
  },
  label: {
    color: '#faffd6',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e2a35',
    color: '#faffd6',
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
    color: '#faffd6',
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
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cepButtonText: {
    color: '#faffd6',
    fontSize: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#faffd6',
    marginLeft: 10,
    fontSize: 18,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    marginTop: 30,
  },
  changePasswordText: {
    color: '#faffd6',
    marginLeft: 10,
    fontSize: 18,
  },
});

