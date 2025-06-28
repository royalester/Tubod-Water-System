import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HouseholdsScreen = ({ route }) => {
  // const { householdId } = route.params; // passed from previous screen
  const householdId = route?.params?.householdId || 'TBD001'; // hardcoded for testing, replace with actual householdId from route params
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        // const res = await axios.get(`http://192.168.3.35:3001/billing/history/${householdId}`);
        const res = await axios.get(`http://.168.43.43:3001/billing/history/${householdId}`);
        setBillingHistory(res.data);
      } catch (err) {
        console.error('Failed to load billing history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingHistory();
  }, [householdId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing History - {householdId}</Text>
      <FlatList
        data={billingHistory}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.cell}>{item.consumption} m³</Text>
            <Text style={styles.cell}>₱{item.billAmount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HouseholdsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  cell: { flex: 1, textAlign: 'center' }
});
