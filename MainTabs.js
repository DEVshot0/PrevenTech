import * as React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet, View, TextInput, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Veiculos from './components/Veiculos';
import Home from './components/Home';
import Conta from './components/Conta';
import { UserContext } from './contexts/UserContext';
import { useTheme } from './contexts/ThemeContext';

const Tab = createBottomTabNavigator();

const darkColors = {
  backgroundColor: '#091015',
  tabBarBackgroundColor: '#091015',
  borderColor: '#0f1d29',
  activeTintColor: 'rgba(70, 130, 180, 0.5)',
  inactiveTintColor: '#faffd6',
  placeholderTextColor: '#888',
  searchBarBackgroundColor: 'transparent',
  searchInputBackgroundColor: '#0f1d29',
  searchInputTextColor: '#fff',
  focusedBackgroundColor: 'rgba(70, 130, 180, 0.3)',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  tabBarBackgroundColor: '#fdfff2',
  borderColor: '#0f1d29',
  activeTintColor: 'rgba(70, 130, 180, 0.5)',
  inactiveTintColor: '#091015',
  placeholderTextColor: '#888',
  searchBarBackgroundColor: 'transparent',
  searchInputBackgroundColor: '#c2c2c2',
  searchInputTextColor: '#091015',
  focusedBackgroundColor: 'rgba(70, 130, 180, 0.3)',
};

const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      {focused && <View style={[styles.focusedBackground, { backgroundColor: colors.focusedBackgroundColor }]} />}
      <View style={styles.innerContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View style={[styles.searchBarContainer, { backgroundColor: colors.searchBarBackgroundColor }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.searchInputBackgroundColor, color: colors.searchInputTextColor }]}
        placeholder="Pesquisar"
        placeholderTextColor={colors.placeholderTextColor}
      />
    </View>
  );
};

function MainTabs({ route }) {
  const { user } = useContext(UserContext);
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundColor }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#000' : colors.backgroundColor} />
      <View style={styles.container}>
        <SearchBar />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.tabBarBackgroundColor,
              borderTopWidth: 0.8,
              borderTopColor: colors.borderColor,
              height: 60,
              paddingVertical: 5,
            },
            tabBarActiveTintColor: colors.activeTintColor,
            tabBarInactiveTintColor: colors.inactiveTintColor,
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
    borderRadius: 15,
    height: 50,
    width: 80,
  },
  innerContainer: {
    zIndex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    zIndex: 1000,
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
});

export default MainTabs;
