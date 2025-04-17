import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading delay (e.g. checking token)
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hella$avings</Text>
      <Text style={styles.subtitle}>Empowering the self-employed</Text>
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
  subtitle: { fontSize: 16, marginTop: 10, color: '#555' },
});

export default LoadingScreen;
