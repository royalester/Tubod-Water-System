import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import HouseholdsScreen from './HouseholdsScreen';
import PaymentsScreen from './PaymentsScreen';
import ReadingsScreen from './ReadingsScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
            } else if (route.name === 'Households') {
              return <MaterialIcons name={focused ? 'people' : 'people-outline'} size={size} color={color} />;
            } else if (route.name === 'Payments') {
              return <FontAwesome5 name={focused ? 'money-bill-wave' : 'money-bill-wave'} size={size} color={color} />;
            } else if (route.name === 'Readings') {
              return <MaterialCommunityIcons name={focused ? 'water' : 'water-outline'} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Households" component={HouseholdsScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Readings" component={ReadingsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
