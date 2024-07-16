import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../contexts/ThemeContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

const Home = ({ route, navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const handlePress = () => {
    Alert.alert('Button Pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity key={index} onPress={handlePress} style={[styles.button, { backgroundColor: colors.buttonBackgroundColor, borderColor: colors.borderColor }]}>
            <Icon name="truck" size={60} color={colors.iconColor} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: colors.textColor }]}>OGV-4455</Text>
              <Text style={[styles.normalText, { color: colors.textColor }]}>Scania</Text>
              <Text style={[styles.boldText, { color: colors.textColor }]}>Pobrema</Text>
            </View>
            <Icon name="chevron-right" size={45} color={colors.iconColor} style={styles.rightIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButtonRight}
        onPress={() => navigation.navigate('Filtrar')}
      >
        <Icon name="filter" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -19,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.24, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    borderWidth: 0.8,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    marginBottom: 5,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 0.4, 
  },
  normalText: {
    fontSize: 16,
    flex: 0.3, 
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 0.3, 
  },
  rightIcon: {
    marginLeft: 20,
  },
  floatingButtonRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
