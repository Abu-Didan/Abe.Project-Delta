// screens/SpouseInfoScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { fetchSpouse, saveSpouse } from '../services/profileService';

const YELLOW = '#FFD700'; // brand colour

const SpouseInfoScreen = ({ navigation }) => {
  const [spouseName,  setSpouseName]  = useState('');
  const [spouseEmail, setSpouseEmail] = useState('');
  const [jobTitle,    setJobTitle]    = useState('');
  const [saving,      setSaving]      = useState(false);

  /* preload saved spouse doc */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await fetchSpouse();
        if (snap.exists()) {
          const d = snap.data();
          setSpouseName(d.spouseName  || '');
          setSpouseEmail(d.spouseEmail || '');
          setJobTitle(d.jobTitle      || '');
        }
      } catch (e) {
        console.log('❌ fetchSpouse failed:', e.message);
      }
    };
    load();
  }, []);

  /* fire-and-forget save */
  const handleSave = () => {
    setSaving(true);

    saveSpouse({ spouseName, spouseEmail, jobTitle })
      .then(() => console.log('✅ spouse info saved'))
      .catch((e) => console.log('❌ saveSpouse failed', e.message))
      .finally(() => setSaving(false));

    navigation.goBack(); // return instantly
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Spouse Information</Text>

      <Text style={styles.label}>Spouse Name</Text>
      <TextInput
        style={styles.input}
        value={spouseName}
        onChangeText={setSpouseName}
        placeholder="Jane Doe"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Spouse Email</Text>
      <TextInput
        style={styles.input}
        value={spouseEmail}
        onChangeText={setSpouseEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="jane@example.com"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={jobTitle}
        onChangeText={setJobTitle}
        placeholder="Manager"
        placeholderTextColor="#666"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {saving ? (
          <ActivityIndicator style={{ marginTop: 12 }} color="#fff" />
        ) : (
          <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0f0f0f', flexGrow: 1 },
  header:   { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 20, alignSelf: 'center' },
  label:    { color: '#ccc', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#1a1a1a',
    color: YELLOW,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  button:    { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  cancel:    { backgroundColor: '#333' },
  save:      { backgroundColor: 'green' },
  buttonText:{ color: '#fff', fontWeight: 'bold' },
});

export default SpouseInfoScreen;
