import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Veiculos() {
  return (
    <View style={styles.container}>
      <Text>Veiculos!</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091015',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
