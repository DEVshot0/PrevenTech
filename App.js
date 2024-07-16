import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './navigation/StackNavigator';
import Providers from './providers/Providers';

export default function App() {
  return (
    <Providers>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              <StackNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Providers>
  );
}
