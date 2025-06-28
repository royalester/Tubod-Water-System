import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ActivityIndicator, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
// import { getReadings, getHouseholds } from '../services/api';
import axios from 'axios';
// const mongoose = require('mongoose');
// const twilio = require('twilio');

export default function ReadingsScreen() {
  // const [households, setHouseholds] = useState([
  //   { _id: '1', householdId: 'TBD001', ownerName: 'Juan Dela Cruz', mobile: '09171234567' },
  //   { _id: '2', householdId: 'TBD002', ownerName: 'Maria Santos', mobile: '09281234567' },
  //   { _id: '3', householdId: 'TBD003', ownerName: 'Pedro Reyes', mobile: '09391234567' },
  //   { _id: '4', householdId: 'TBD004', ownerName: 'Ana Lopez', mobile: '09491234567' },
  //   { _id: '5', householdId: 'TBD005', ownerName: 'Josefa Garcia', mobile: '09551234567' },
  // ]);
  const [readings, setReadings] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const debounceTimeout = useRef();
  const [households, setHouseholds] = useState([]);


  
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/households')
  //     .then(res => res.json())
  //     .then(data => {
  //       setHouseholds(data);
  //       setLoading(false);
  //     });
  // }, []);
  
   // Fetch households on mount
  useEffect(() => {
  setLoading(true); // start loading
  // fetch('http://192.168.3.35:3001/households')
  fetch('http://192.168.43.43:3001/households')
    .then(res => res.json())
    .then(data => {
      setHouseholds(data);
      setLoading(false); // stop loading
    })
    .catch(err => {
      console.error('Error fetching households:', err);
      setLoading(false);
    });
}, []);
  

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [search]);

  const handleInput = (id, field, value) => {
    setReadings(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  // const handleSave = async (id) => {
  //   setSaving(id);
  //   const reading = readings[id];

  //   const household = households.find(h => h._id === id);
  // if (!household) {
  //   Alert.alert('Error', 'Household not found.');
  //   return;
  // }
  //   const payload = {
  //     householdId: households.find(h => h._id === id).householdId,
  //     previous: Number(readings[id].previous),
  //     current: Number(readings[id].current),
  //   };

  //   try {
  //     // const response = await axios.post('http://192.168.3.35:3001/billing/generate', {
  //   const response = await axios.post('http://192.168.43.59:3001/billing/generate', {
  //     householdId: household.householdId,
  //     previous: parseFloat(reading.previous),
  //     current: parseFloat(reading.current)
  //   });

  //   setReceiptData(response.data);
  //   setShowReceipt(true);

  //   // Optionally show a toast
  //   Alert.alert('Success', 'Billing generated and SMS notification sent!');
  // } catch (error) {
  //   console.error('Error saving reading:', error);
  //   Alert.alert('Error', 'Failed to generate bill.');
  // } finally {
  //   setSaving(false);
  // }
  // };
  const handleSave = async (id) => {
  setSaving(id);
  const reading = readings[id];

  const household = households.find(h => h._id === id);
  if (!household) {
    Alert.alert('Error', 'Household not found.');
    setSaving(false);
    return;
  }

  try {
    const response = await axios.post('http://192.168.43.43:3001/billing/single', {
      householdId: household.householdId,
      previous: parseFloat(reading.previous),
      current: parseFloat(reading.current),
    });

    // Make sure to set all expected fields for receiptData
    setReceiptData({
      householdId: household.householdId,
      ownerName: household.ownerName,
      previous: response.data.previous,
      current: response.data.current,
      usage: response.data.usage,
      amount: response.data.amount, // bill amount
      date: response.data.date,
    });
    setShowReceipt(true);
    // Optionally show a toast
    Alert.alert('Success', 'Billing generated and SMS notification sent!');
  } catch (error) {
    console.error('Error saving reading:', error);
    Alert.alert('Error', 'Failed to generate bill.');
  } finally {
    setSaving(false);
  }
};


  const filteredHouseholds = households.filter(h =>
    h.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    h.householdId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Readings</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search household..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.tableHeader}>
        <Text style={[styles.idCell, styles.headerCell]}>ID</Text>
        <Text style={[styles.name, styles.headerCell]}>Household</Text>
        <Text style={styles.headerCell}>Previous</Text>
        <Text style={styles.headerCell}>Current</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>
      <FlatList
        data={filteredHouseholds}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.householdId} - {item.ownerName}</Text>
            <Text style={styles.cardDetail}>Mobile: {item.mobile}</Text>
            <Text style={styles.cardDetail}>Purok: {item.purok}</Text>
            <View style={styles.cardInputRow}>
              <TextInput
                style={styles.input}
                placeholder="Previous"
                keyboardType="numeric"
                value={readings[item._id]?.previous || ''}
                onChangeText={val => handleInput(item._id, 'previous', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Current"
                keyboardType="numeric"
                value={readings[item._id]?.current || ''}
                onChangeText={val => handleInput(item._id, 'current', val)}
              />
              <Button
                title={saving === item._id ? 'Saving...' : 'Save'}
                onPress={() => handleSave(item._id)}
                disabled={
                  saving === item._id ||
                  !readings[item._id]?.previous ||
                  !readings[item._id]?.current
                }
              />
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Modal
        visible={showReceipt}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReceipt(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.receiptContainer}>
            <Text style={styles.receiptTitle}>Payment Receipt</Text>
            {receiptData && (
              <>
                <Text>ID: {receiptData.householdId}</Text>
                <Text>Name: {receiptData.ownerName}</Text>
                <Text>Previous: {receiptData.previous}</Text>
                <Text>Current: {receiptData.current}</Text>
                <Text>Usage: {receiptData.usage}</Text>
                <Text>Date: {receiptData.date}</Text>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                  <QRCode value={JSON.stringify(receiptData)} size={120} />
                </View>
              </>
            )}
            <Button title="Close" onPress={() => {
              setShowReceipt(false);
              setSaving(false); // Enable Save button again after closing modal
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  name: { flex: 1, fontSize: 16 },
  input: { width: 70, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginHorizontal: 5, textAlign: 'center' },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    marginBottom: 4,
    borderRadius: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  idCell: {
    width: 70,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: 'center',
    elevation: 5,
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  cardDetail: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  cardInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
});
