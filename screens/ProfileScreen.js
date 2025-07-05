import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const tiles = [
    {
      title: 'Personal Information',
      subtitle: 'Update your name, email, and contact information',
      icon: '👤',
      route: 'EditPersonalInfo', 
    },
    {
      title: 'Business Information',
      subtitle: 'Manage your business details and settings',
      icon: '🏢',
      route: 'BusinessInfoScreen',
    },
    {
      title: 'Spouse Information',
      subtitle: 'Update spouse details and job information',
      icon: '👨‍👩‍👧‍👦',
      route: 'SpouseInfoScreen',
    },
    {
      title: 'Plan Details',
      subtitle: 'Configure your medical reimbursement plan',
      icon: '📋',
      route: 'PlanDetailsScreen',
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <Text style={styles.subheader}>Update your personal information, business details, and plan settings</Text>
        <View style={styles.tileContainer}>
          {tiles.map((tile, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.tile}
              onPress={() => navigation.navigate(tile.route)}
            >
              <Text style={styles.icon}>{tile.icon}</Text>
              <Text style={styles.tileTitle}>{tile.title}</Text>
              <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subheader: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  tile: {
    width: '45%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tileSubtitle: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 6,
  },
});

export default ProfileScreen;
