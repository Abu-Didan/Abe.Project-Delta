// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    if (!navigation) return;              // <— guard for AuthContext use
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Empowering the self-employed</Text>
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  subtitle: { fontSize: 16, marginTop: 10, color: '#555' },
});

export default LoadingScreen;
