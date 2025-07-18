import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';   // ← NEW

const HomeScreen = ({ navigation }) => {
  /* --- ONE-OFF FIRESTORE TEST ------------------------------------------ */
  useEffect(() => {
    const pushTestDoc = async () => {
      try {
        if (!auth.currentUser) return; // should always be signed in here
        await addDoc(collection(db, 'sanityChecks'), {
          uid: auth.currentUser.uid,
          checkedAt: serverTimestamp(),
        });
        console.log('✅ Firestore sanity doc added');
      } catch (e) {
        console.log('❌ Firestore test failed:', e.message);
      }
    };
    pushTestDoc();
  }, []);
  /* --------------------------------------------------------------------- */

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 16,
        }}
        style={{ backgroundColor: '#0f0f0f' }}
      >
        {/* … (your original JSX unchanged) … */}
        <Text style={styles.sectionTitle}>Medical Expenses</Text>
        <View style={styles.cardRow}>
          <FeatureCard
            icon={<MaterialIcons name="add" size={32} color="#0f0f0f" />}
            title="Add Expense"
            subtitle="Record a new medical expense"
            onPress={() => navigation.navigate('AddExpense')}
          />
          <FeatureCard
            icon={<Ionicons name="list" size={32} color="#0f0f0f" />}
            title="All Expenses"
            subtitle="View and manage medical expenses"
            onPress={() => navigation.navigate('ExpenseManager')}
          />
        </View>

        <Text style={styles.sectionTitle}>Plan Management</Text>
        <View style={styles.cardRow}>
          <FeatureCard
            icon={<FontAwesome5 name="briefcase" size={28} color="#0f0f0f" />}
            title="Log Hours"
            subtitle="Record your work hours"
            onPress={() => navigation.navigate('LogHours')}
          />
          <FeatureCard
            icon={<Ionicons name="document-text" size={30} color="#0f0f0f" />}
            title="Plan Documents"
            subtitle="View your REAP 105 plan documents"
            onPress={() => navigation.navigate('PlanDocuments')}
          />
          <FeatureCard
            icon={<Ionicons name="bar-chart" size={30} color="#0f0f0f" />}
            title="Expense Analytics"
            subtitle="View detailed expense reports"
            onPress={() => navigation.navigate('ExpenseAnalytics')}
          />
        </View>
      </ScrollView>

      {/* Bottom navigation bar */}
    </View>
  );
};

function FeatureCard({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconCircle}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gold',
    paddingBottom: 6,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  iconCircle: {
    backgroundColor: 'gold',
    padding: 16,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default HomeScreen;
