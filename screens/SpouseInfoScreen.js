import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SpouseInfoScreen = ({ navigation }) => {
  const [spouseName, setSpouseName] = useState('');
  const [spouseEmail, setSpouseEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSave = () => {
    // TODO: Save to Firebase or local state
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Spouse Information</Text>

      <Text style={styles.label}>Spouse Name:</Text>
      <TextInput style={styles.input} value={spouseName} onChangeText={setSpouseName} />

      <Text style={styles.label}>Spouse Email:</Text>
      <TextInput
        style={styles.input}
        value={spouseEmail}
        onChangeText={setSpouseEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Job Title:</Text>
      <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0f0f0f',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#ccc',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#333',
  },
  save: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SpouseInfoScreen;
