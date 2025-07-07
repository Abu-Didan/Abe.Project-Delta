import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import {
  Feather, FontAwesome5, MaterialCommunityIcons
} from '@expo/vector-icons';
import Navbar from '../components/Navbar';

const LogHoursScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Employee Journal</Text>

        <View style={styles.cardRow}>
          <FeatureCard icon={<Feather name="clock" size={28} color="#0f0f0f" />} title="Record Hours" />
          <FeatureCard icon={<FontAwesome5 name="money-bill" size={28} color="#0f0f0f" />} title="Record Pay" />
        </View>

        <SummarySection title="Hours Report Summary" data={[
          { label: 'Today', value: '0.0', unit: 'hours' },
          { label: 'This Week', value: '0.0', unit: 'hours' },
          { label: 'This Month', value: '0.0', unit: 'hours' },
          { label: 'This Year', value: '0.0', unit: 'hours' },
        ]} />

        <SummarySection title="W-2 Wage Report Summary" data={[
          { label: 'This Month', value: '$0', unit: 'paid' },
          { label: 'This Quarter', value: '$0', unit: 'paid' },
          { label: 'Year to Date', value: '$0', unit: 'paid' },
          { label: 'Total Payments', value: '0', unit: 'payments' },
        ]} />
      </ScrollView>

      <Navbar />
    </View>
  );
};

const FeatureCard = ({ icon, title }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const SummarySection = ({ title, data }) => (
  <View style={styles.summarySection}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <View style={styles.summaryGrid}>
      {data.map((item, index) => (
        <View key={index} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{item.value}</Text>
          <Text style={styles.summaryLabel}>{item.label}</Text>
          <Text style={styles.summaryUnit}>{item.unit}</Text>
        </View>
      ))}
    </View>
    <TouchableOpacity style={styles.reportButton}>
      <Text style={styles.reportButtonText}>View Full Report</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
      fontSize: 30,
      color: '#fff',
      fontWeight: '900',
      marginBottom: 12,
      marginTop: 40,
      textAlign: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'gold',
      paddingBottom: 6,
      alignSelf: 'center',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#006400',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 6,
  },
  iconCircle: {
    backgroundColor: 'gold',
    padding: 14,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  summarySection: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    padding: 12,
    width: '47%',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 22,
    color: 'gold',
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  summaryUnit: {
    fontSize: 12,
    color: '#888',
  },
  reportButton: {
    backgroundColor: 'gold',
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00ff00',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 4,
  },
  reportButtonText: {
    color: '#1c1c1c',
    fontWeight: 'bold',
  },
});

export default LogHoursScreen;