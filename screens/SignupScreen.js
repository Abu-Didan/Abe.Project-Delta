import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return Alert.alert('Missing info', 'Please fill all fields.');
    }
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      // optional: create a profile doc
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
      // AuthContext will switch to MainStack automatically
    } catch (err) {
      Alert.alert('Sign-up failed', err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="black"
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="black"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0f0f0f" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.linkWrap}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header:    { fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 30 },
  input:     { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 10, backgroundColor: '#fff', color: '#000' },
  button:    { backgroundColor: 'gold', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText:{ color: '#0f0f0f', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  linkWrap:  { textAlign: 'center', marginTop: 10 },
  link:      { color: 'gold', textDecorationLine: 'underline' },
});

export default SignupScreen;
