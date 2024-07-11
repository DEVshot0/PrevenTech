import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Supondo que o contexto esteja em ThemeContext.js
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Config({ navigation }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colors.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textColor }]}>Config</Text>
      </View>
      <Text style={{ color: colors.textColor }}>Configurações</Text>
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: colors.buttonBackgroundColor }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.textColor }}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
      </TouchableOpacity>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#000' : colors.backgroundColor} />
    </View>
  );
}

const darkColors = {
  backgroundColor: '#091015',
  buttonBackgroundColor: '#182d3e',
  borderColor: '#0f1d29',
  textColor: '#faffd6',
  iconColor: '#4682B4'
};

const lightColors = {
  backgroundColor: '#fdfff2',
  buttonBackgroundColor: '#8abee3',
  borderColor: '#4682B4',
  textColor: '#26455c',
  iconColor: '#4682B4'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
