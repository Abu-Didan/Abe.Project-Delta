// screens/EditPersonalInfoScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { fetchProfile, saveProfile } from '../services/profileService';

const EditPersonalInfoScreen = ({ navigation }) => {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  /* load existing profile once */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await fetchProfile();
        if (snap.exists()) {
          const d = snap.data();
          setName(d.name  || '');
          setEmail(d.email || '');
          setPhone(d.phone || '');
        }
      } catch (e) {
        console.log('❌ fetchProfile failed:', e.message);
      }
    };
    load();
  }, []);

  /* fire-and-forget save */
  const handleSave = () => {
    setSaving(true);

    saveProfile({ name, email, phone })
      .then(() => console.log('✅ profile saved'))
      .catch((e) => console.log('❌ saveProfile failed:', e.message))
      .finally(() => setSaving(false));

    navigation.goBack();          // return right away
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Personal Info</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />

      {saving ? (
        <ActivityIndicator style={{ marginTop: 20 }} color="#FFD700" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f0f0f' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: 'gold',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#0f0f0f',
    fontSize: 16,
  },
});

export default EditPersonalInfoScreen;
