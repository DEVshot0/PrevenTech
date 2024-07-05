import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {

  const handlePress = () => {
    Alert.alert('Button Pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="truck" size={60} color="#4682B4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>OGV-4455</Text>
            <Text style={styles.normalText}>Scania</Text>
            <Text style={styles.boldText}>Pobrema</Text>
          </View>
          <Icon name="chevron-right" size={45} color="#4682B4" style={styles.rightIcon} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -19,
    backgroundColor: '#091015',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.24, // Increased height to accommodate all text elements
    backgroundColor: '#182d3e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add space between the icon and the text
    borderWidth: 0.8,
    borderColor: '#0f1d29',
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
    color: '#faffd6',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 0.4, // 40% of the button height
  },
  normalText: {
    color: '#faffd6',
    fontSize: 16,
    flex: 0.3, // 30% of the button height
  },
  boldText: {
    color: '#faffd6',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 0.3, // 30% of the button height
  },
  rightIcon: {
    marginLeft: 20,
  },
});

export default Home;
