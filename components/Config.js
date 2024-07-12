import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; 
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
        <Text style={[styles.title, { color: colors.textColor }]}>Configurações</Text>
      </View>
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: colors.buttonBackgroundColor }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.textColor }}>{isDarkMode ? 'Trocar para modo claro' : 'Trocar para modo escuro'}</Text>
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
    justifyContent: 'flex-start',
    paddingTop: 20, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 18,
    flex: 1,
  },
  toggleButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
