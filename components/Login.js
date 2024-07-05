import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        
        if (savedUsername) setUsername(savedUsername);
        if (savedPassword) setPassword(savedPassword);
        if (savedRememberMe !== null) setRememberMe(JSON.parse(savedRememberMe));
      } catch (e) {
        console.error('Failed to load credentials', e);
      }
    };

    loadCredentials();
  }, []);

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      } else {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('rememberMe');
      }
    } catch (e) {
      console.error('Failed to save credentials', e);
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(username)) {
      setError('Por favor insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    // Lógica de autenticação aqui
    const isAuthenticated = true; // Simulação de autenticação bem-sucedida
    if (!isAuthenticated) {
      setError('Usuário ou senha incorretos.');
      return;
    }
    setError('');
    await saveCredentials();
    navigation.navigate('Main'); // Navega para MainTabs após login bem-sucedido
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
              <View style={styles.rememberMeContainer}>
                <Checkbox
                  status={rememberMe ? 'checked' : 'unchecked'}
                  onPress={() => setRememberMe(!rememberMe)}
                  color="#4682B4"
                />
                <Text style={styles.rememberMeText}>Lembrar meu login</Text>
              </View>
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 150 / 110,
    marginBottom: 40,
    marginRight: 20
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'flex-start',
    //width: '100%',
    marginBottom: -10,
    marginTop: -30,
    marginLeft: -11,
  },
  rememberMeText: {
    marginLeft: -7,
    color: '#4682B4',
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
