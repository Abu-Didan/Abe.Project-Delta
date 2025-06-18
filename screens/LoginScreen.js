import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    } else {
      //alert('Please enter both fields');
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>REAP</Text>
      <Text style={styles.gold}>        105</Text>
      <Text style={[styles.sublogo, { textAlign: 'center' }, { marginBottom: 0 }]}>Your 105 Plan</Text>
      <Text style={[styles.subtext, { textAlign: 'center' }, { marginBottom: 10 }]}>Automated. Compliant. Easy.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor='black'
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='black'
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={[styles.link, { textAlign: 'right' }]}>Forgot password?</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={[styles.signup, { textAlign: 'center' }, { marginBottom: 10 }]}>Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { 
    fontSize: 70, 
    fontWeight: '900', 
    color: '#fff', 
    textAlign: 'center', 
    marginTop: 0, 
    marginBottom: -30 
  },
  gold: { 
    fontSize: 50, 
    fontWeight: '900', 
    color: 'gold', 
    textAlign: 'center', 
    marginTop: 0, 
    marginBottom: 0 
  },
  sublogo: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  subtext: { 
    fontSize: 20, 
    color: '#fff' 
  },
  signup: { 
    fontSize: 15, 
    color: '#fff' 
  },
  link: { 
    fontSize: 15,
    color: 'gold', 
    textDecorationLine: 'underline' 
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#0f0f0f' 
  },
  header: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 30, 
    color: '#0f0f0f' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    backgroundColor: 'white', 
    color: 'black', 
    borderRadius: 8, 
    padding: 12, 
    marginVertical: 10 
  },
  button: { 
    backgroundColor: 'gold', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 20, 
    marginBottom: 20 
  },
  buttonText: { 
    color: '#0f0f0f', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});


export default LoginScreen;
