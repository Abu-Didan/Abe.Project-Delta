// screens/BusinessInfoScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  addBusiness,
  getBusiness,
  updateBusiness,
} from '../services/profileService';

const YELLOW = '#FFD700';      /* <- brand colour */

const empty = {
  businessName: '',
  businessType: 'Sole Proprietor',
  ein: '',
  startDate: new Date(),
  address: '',
  city: '',
  state: '',
  zip: '',
  planDate: new Date(),
  planType: '',
};

const BusinessInfoScreen = ({ route, navigation }) => {
  const bizId = route.params?.businessId || null;
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  /* load if editing */
  useEffect(() => {
    if (!bizId) return;
    (async () => {
      const snap = await getBusiness(bizId);
      if (snap.exists()) {
        const d = snap.data();
        setForm({
          ...d,
          startDate: d.startDate ? new Date(d.startDate) : new Date(),
          planDate: d.planDate ? new Date(d.planDate) : new Date(),
        });
      }
    })();
  }, [bizId]);

  const bind = (k) => (v) => setForm({ ...form, [k]: v });

  const save = () => {
    setSaving(true);
    const payload = {
      ...form,
      startDate: form.startDate.toISOString(),
      planDate: form.planDate.toISOString(),
    };
    (bizId ? updateBusiness(bizId, payload) : addBusiness(payload))
      .then(() => console.log('✅ business saved'))
      .catch((e) => console.log('❌ business save failed', e.message))
      .finally(() => {
        setSaving(false);
        navigation.goBack();
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{bizId ? 'Edit' : 'Add'} Business</Text>

      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.input}
        value={form.businessName}
        onChangeText={bind('businessName')}
        placeholder="My LLC"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Business Type</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={form.businessType}
          onValueChange={bind('businessType')}
          style={styles.picker}           // yellow text
          itemStyle={styles.pickerItem}   // yellow list rows
        >
          <Picker.Item label="Sole Proprietor" value="Sole Proprietor" />
          <Picker.Item label="LLC" value="LLC" />
          <Picker.Item label="Partnership" value="Partnership" />
          <Picker.Item label="Corporation" value="Corporation" />
        </Picker>
      </View>

      <Text style={styles.label}>EIN</Text>
      <TextInput
        style={styles.input}
        value={form.ein}
        onChangeText={bind('ein')}
        keyboardType="number-pad"
        placeholder="12-345678"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Business Start Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowStart(true)}>
        <Text style={styles.dateTxt}>{form.startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStart && (
        <DateTimePicker
          value={form.startDate}
          mode="date"
          onChange={(e, d) => {
            setShowStart(false);
            if (d) setForm({ ...form, startDate: d });
          }}
        />
      )}

      {/* address fields */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={form.address}
        onChangeText={bind('address')}
        placeholder="123 Main St"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={form.city}
        onChangeText={bind('city')}
        placeholder="Phoenix"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        value={form.state}
        onChangeText={bind('state')}
        placeholder="AZ"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>ZIP</Text>
      <TextInput
        style={styles.input}
        value={form.zip}
        onChangeText={bind('zip')}
        keyboardType="number-pad"
        placeholder="85001"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Plan Start Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPlan(true)}>
        <Text style={styles.dateTxt}>{form.planDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPlan && (
        <DateTimePicker
          value={form.planDate}
          mode="date"
          onChange={(e, d) => {
            setShowPlan(false);
            if (d) setForm({ ...form, planDate: d });
          }}
        />
      )}

      <Text style={styles.label}>Plan Type</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={form.planType}
          onValueChange={bind('planType')}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Plan" value="" />
          <Picker.Item label="Individual HRA" value="Individual HRA" />
          <Picker.Item label="Standard 105" value="Standard 105" />
        </Picker>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTxt}>Cancel</Text>
        </TouchableOpacity>

        {saving ? (
          <ActivityIndicator color="#fff" style={{ marginTop: 12 }} />
        ) : (
          <TouchableOpacity style={[styles.btn, styles.save]} onPress={save}>
            <Text style={styles.btnTxt}>{bizId ? 'Update' : 'Save'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0f0f0f', flexGrow: 1 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: { color: '#ccc', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#1a1a1a',
    color: YELLOW,                     // input text yellow
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  dateTxt: { color: YELLOW },          // date labels yellow
  pickerWrap: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  picker: { color: YELLOW },           // selected item yellow
  pickerItem: { color: YELLOW },       // dropdown rows yellow
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  cancel: { backgroundColor: '#333' },
  save: { backgroundColor: 'green' },
  btnTxt: { color: '#fff', fontWeight: 'bold' },
});

export default BusinessInfoScreen;
