import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlanOverviewScreen = ({ route, navigation }) => {
  const role = route?.params?.role || 'Employee';
  const planYear = '2024';

  // Mocked data
  const totalExpenses = 3200;
  const reimbursed = 2800;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current {planYear} Report</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{role}</Text>

        <Text style={styles.label}>Plan Year:</Text>
        <Text style={styles.value}>{planYear}</Text>

        <Text style={styles.label}>Total Expenses Submitted:</Text>
        <Text style={styles.value}>${totalExpenses.toFixed(2)}</Text>

        <Text style={styles.label}>Approved Reimbursements:</Text>
        <Text style={styles.value}>${reimbursed.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SubmitExpense')}
      >
        <Text style={styles.buttonText}>Submit New Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EnteredExpenses')}
      >
        <Text style={styles.buttonText}>View Entered Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF3B30' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white', justifyContent: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  value: { fontSize: 16, marginBottom: 5 },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default PlanOverviewScreen;
