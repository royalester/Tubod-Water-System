// App.js
// import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import HouseholdsScreen from './screens/HouseholdsScreen'; // <- billing history
import LoginScreen from './screens/LoginScreen';
import ReadingsScreen from './screens/ReadingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReadingsScreen" component={ReadingsScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HouseholdsScreen" component={HouseholdsScreen} options={{ title: 'Billing History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
