import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Login from './components/Login';
import MainTabs from './MainTabs';
import Conta from './components/Conta';
import Perfil from './components/Perfil';
import Metodos from './components/Metodos';
import Config from './components/Config';
import Ajuda from './components/Ajuda';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Main" component={MainTabs} />
                  <Stack.Screen name="Conta" component={Conta} />
                  <Stack.Screen name="Perfil" component={Perfil} />
                  <Stack.Screen name="Metodos" component={Metodos} />
                  <Stack.Screen name="Config" component={Config} />
                  <Stack.Screen name="Ajuda" component={Ajuda} />
                </Stack.Navigator>
              </SafeAreaView>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
