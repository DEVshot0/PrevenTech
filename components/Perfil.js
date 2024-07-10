import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width: windowWidth } = Dimensions.get('window');

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numeroResidencia, setNumeroResidencia] = useState('');

  const handleCepChange = async (text) => {
    setCep(text);
    if (text.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${text}/json/`);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
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
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            keyboardType='phone-pad'
            placeholder='DDD + Número'
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={handleCepChange}
          keyboardType='numeric'
        />
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

