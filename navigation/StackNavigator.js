import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import MainTabs from '../MainTabs';
import Conta from '../components/Conta';
import Perfil from '../components/Perfil';
import Metodos from '../components/Metodos';
import Config from '../components/Config';
import Ajuda from '../components/Ajuda';
import Adicionar from '../components/Adicionar';
import Filtrar from '../components/Filtrar';  

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Conta" component={Conta} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Metodos" component={Metodos} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Ajuda" component={Ajuda} />
      <Stack.Screen name="Adicionar" component={Adicionar} />
      <Stack.Screen name="Filtrar" component={Filtrar} /> 
    </Stack.Navigator>
  );
};

export default StackNavigator;
