import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './components/Login';
import MainTabs from './MainTabs';
import Conta from './components/Conta';
import Perfil from './components/Perfil';
import Metodos from './components/Metodos';
import Config from './components/Config';
import Ajuda from './components/Ajuda';
import { UserProvider } from './contexts/UserContext';

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Conta" component={Conta} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Metodos" component={Metodos} />
          <Stack.Screen name="Config" component={Config} />
          <Stack.Screen name="Ajuda" component={Ajuda} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </UserProvider>
  );
}

export default App;
