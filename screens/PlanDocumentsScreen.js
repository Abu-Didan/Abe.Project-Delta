import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Navbar from '../components/Navbar';

const PlanDocumentsScreen = ({ navigation }) => {
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
        <Text style={styles.sectionTitle}>Plan Documents</Text>

        <View style={styles.cardRow}>
          <FeatureCard
            icon={<MaterialIcons name="description" size={32} color="#0f0f0f" />}
            title="Master Plan Document"
            subtitle="Comprehensive legal foundation of your 105 plan. It outlines the plan's provisions, benefits, eligibility requirements, and procedures."
          />
          <FeatureCard
            icon={<FontAwesome5 name="book-open" size={32} color="#0f0f0f" />}
            title="Summary Plan Description"
            subtitle="A simplified explanation of your 105 plan designed for plan participants. Explains the benefits simply, including how to file and appeal claims."
          />
        </View>

        <View style={styles.cardRow}>
          <FeatureCard
            icon={<MaterialCommunityIcons name="calendar-check" size={32} color="#0f0f0f" />}
            title="Adoption Agreement"
            subtitle="The legal document that formally establishes your business's participation in the 105 plan. It contains specific elections and customizations for your business's implementation of the plan."
          />
          <FeatureCard
            icon={<MaterialCommunityIcons name="printer" size={32} color="#0f0f0f" />}
            title="Employer-Employee Agreement"
            subtitle="This legal document outlines the employment relationship between the business owner and spouse employee. It details duties, compensation, and REAP 105 plan participation terms."
          />
        </View>

        <View style={styles.cardRow}>
          <FeatureCard
            icon={<FontAwesome5 name="folder" size={32} color="#0f0f0f" />}
            title="Claim Reimbursement Form"
            subtitle="Use this form to request reimbursement for qualified medical expenses under your 105 plan. Attach receipts and required documentation for fast processing."
          />
          <FeatureCard
            icon={<MaterialCommunityIcons name="calendar" size={32} color="#0f0f0f" />}
            title="Annual Submission Form"
            subtitle="Required yearly documentation to maintain your 105 plan's compliant status. Submit health expense summaries and employment verification for the plan year."
          />
        </View>
      </ScrollView>

      <Navbar />
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
    shadowColor: '#0f0f0f',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
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

export default PlanDocumentsScreen;
