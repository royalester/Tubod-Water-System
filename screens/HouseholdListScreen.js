// HouseholdListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HouseholdListScreen = () => {
  const [households, setHouseholds] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('http://192.168.3.35:3001/households')
    axios.get('http://192.168.43.43:3001/households')
      .then(res => setHouseholds(res.data))
      .catch(err => console.error('Failed to load households:', err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={households}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('HouseholdsScreen', { householdId: item.householdId })}
          >
            <Text style={styles.title}>{item.ownerName}</Text>
            <Text style={styles.subtitle}>{item.householdId}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HouseholdListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'gray' },
});
