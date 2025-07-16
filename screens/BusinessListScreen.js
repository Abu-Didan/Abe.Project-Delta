// screens/BusinessListScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot } from 'firebase/firestore';
import { listBusinesses } from '../services/profileService';

const BusinessListScreen = () => {
  const nav = useNavigation();
  const [biz, setBiz] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(listBusinesses(), (qs) => {
      setBiz(qs.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  if (!biz) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={biz}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => nav.navigate('BusinessInfo', { businessId: item.id })}
          >
            <Text style={styles.title}>{item.businessName}</Text>
            <Text style={styles.sub}>{item.businessType}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#ccc', textAlign: 'center' }}>
            No businesses yet.
          </Text>
        }
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => nav.navigate('BusinessInfo')}  /* no id = new */
      >
        <Text style={styles.addTxt}>＋ Add New Business</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 16 },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#aaa' },
  addBtn: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addTxt: { color: '#fff', fontWeight: 'bold' },
});

export default BusinessListScreen;
