import * as React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet, View, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Veiculos from './components/Veiculos';
import Home from './components/Home';
import Conta from './components/Conta';
import { UserContext } from './contexts/UserContext';  // Correct import path

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
    >
      {focused && <View style={styles.focusedBackground} />}
      <View style={styles.innerContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        placeholderTextColor="#888"
      />
    </View>
  );
};

function MainTabs({ route }) {
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#091015',
              borderTopWidth: 0.8,
              borderTopColor: '#0f1d29',
              height: 60,
              paddingVertical: 5,
            },
            tabBarActiveTintColor: 'rgba(70, 130, 180, 0.5)',
            tabBarInactiveTintColor: '#faffd6',
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
            },
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;
              if (route.name === 'Veiculos') {
                iconName = 'truck';
              } else if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Conta') {
                iconName = 'user';
              }
              return <Icon name={iconName} color={color} size={focused ? 25 : 20} />;
            },
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          })}
        >
          <Tab.Screen name="Veiculos" component={Veiculos} />
          <Tab.Screen name="Home" component={Home} initialParams={{ nome: user.nome }} />
          <Tab.Screen name="Conta" component={Conta} initialParams={{ nome: user.nome }} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#091015',
  },
  container: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    borderRadius: 15,
  },
  focusedBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(70, 130, 180, 0.3)',
    borderRadius: 15,
    height: 50,
    width: 80,
  },
  innerContainer: {
    zIndex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#0f1d29',
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: '#0f1d29',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
    color: '#fff',
  },
});

export default MainTabs;
