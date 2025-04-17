import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState('Employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.reset({index: 0, routes: [{name: 'Home', params: { role }}]})
    } else {
      //alert('Please enter both fields');
      navigation.reset({index: 0, routes: [{name: 'Home', params: { role }}]})
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { textAlign: 'center'}, {marginBottom: 10}]}>Login as {role}</Text>

      <View style={styles.roleToggle}>
        <TouchableOpacity onPress={() => setRole('Employee')}>
          <Text style={[styles.toggleText, role === 'Employee' && styles.active]}>
            Employee
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('Employer')}>
          <Text style={[styles.toggleText, role === 'Employer' && styles.active]}>
            Employer
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 30 },
  roleToggle: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  toggleText: { marginHorizontal: 15, fontSize: 18, color: '#888' },
  active: { color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 10 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default LoginScreen;
