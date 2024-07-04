import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(username)) {
      setError('Por favor insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setError('');
    console.log('Login Pressed', username, password);
    // Adicione a lógica de login aqui
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            <View style={styles.loginContainer}>
              <Image source={require('../assets/icone.png')} style={styles.logo} resizeMode="contain" />
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="user" size={30} color="#4682B4" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Usuário"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="lock" size={30} color="#4682B4" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <TouchableOpacity onPress={() => console.log('Esqueci minha senha clicado')}>
                <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: windowWidth * 0.8,
    borderRadius: 10,
  },
  loginContainer: {
    width: windowWidth * 0.7,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 150 / 110, 
    marginBottom: 40,
    marginRight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomColor: '#4682B4',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    paddingTop: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#4682B4',
    marginTop: 25,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
