// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import ReadingsScreen from './screens/ReadingsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HouseholdListScreen from './screens/HouseholdListScreen'; // <- screen with onPress(...)
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          } else if (route.name === 'HouseholdList') {
            return <MaterialIcons name={focused ? 'people' : 'people-outline'} size={size} color={color} />;
          } else if (route.name === 'Payments') {
            return <FontAwesome5 name="money-bill-wave" size={size} color={color} />;
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
      <Tab.Screen name="HouseholdList" component={HouseholdListScreen} options={{ title: 'Households' }} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Readings" component={ReadingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
