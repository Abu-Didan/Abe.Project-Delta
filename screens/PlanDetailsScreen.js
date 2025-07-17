// screens/PlanDetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  fetchPlanSettings,
  savePlanSettings,
} from '../services/profileService';

const YELLOW = '#FFD700';   // brand colour

const PlanDetailsScreen = ({ navigation }) => {
  /* numeric + text fields */
  const [hoursPerWeek,       setHoursPerWeek]       = useState('');
  const [currentEmployees,   setCurrentEmployees]   = useState('');
  const [newEmployees,       setNewEmployees]       = useState('');
  const [seasonalEmployees,  setSeasonalEmployees]  = useState('');

  /* six Yes / No pickers */
  const [premiumIndividual,  setPremiumIndividual]  = useState('Yes');
  const [premiumCancer,      setPremiumCancer]      = useState('Yes');
  const [premiumAccident,    setPremiumAccident]    = useState('Yes');
  const [premiumLife,        setPremiumLife]        = useState('Yes');
  const [premiumLongTerm,    setPremiumLongTerm]    = useState('Yes');

  const [expenseLimit,       setExpenseLimit]       = useState('');
  const [carryOver,          setCarryOver]          = useState('');
  const [carryOverLimit,     setCarryOverLimit]     = useState('');

  const [saving, setSaving] = useState(false);

  /* preload Firestore doc */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await fetchPlanSettings();
        if (!snap.exists()) return;
        const d = snap.data();
        setHoursPerWeek(d.hoursPerWeek || '');
        setCurrentEmployees(d.currentEmployees || '');
        setNewEmployees(d.newEmployees || '');
        setSeasonalEmployees(d.seasonalEmployees || '');

        setPremiumIndividual(d.premiumIndividual || 'Yes');
        setPremiumCancer(d.premiumCancer || 'Yes');
        setPremiumAccident(d.premiumAccident || 'Yes');
        setPremiumLife(d.premiumLife || 'Yes');
        setPremiumLongTerm(d.premiumLongTerm || 'Yes');

        setExpenseLimit(d.expenseLimit || '');
        setCarryOver(d.carryOver || '');
        setCarryOverLimit(d.carryOverLimit || '');
      } catch (e) {
        console.log('❌ fetchPlanSettings failed:', e.message);
      }
    };
    load();
  }, []);

  /* fire-and-forget save */
  const handleSave = () => {
    setSaving(true);

    savePlanSettings({
      hoursPerWeek,
      currentEmployees,
      newEmployees,
      seasonalEmployees,
      premiumIndividual,
      premiumCancer,
      premiumAccident,
      premiumLife,
      premiumLongTerm,
      expenseLimit,
      carryOver,
      carryOverLimit,
    })
      .then(() => console.log('✅ plan settings saved'))
      .catch((e) => console.log('❌ savePlanSettings failed', e.message))
      .finally(() => setSaving(false));

    navigation.goBack();          // return right away
  };

  /* reusable Yes/No picker */
  const YesNoPicker = ({ value, onChange }) => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No"  value="No"  />
      </Picker>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Plan Details</Text>

      {/* Employee Info */}
      <Text style={styles.subheader}>Employee Information</Text>

      <Text style={styles.label}>Hours Per Week:</Text>
      <TextInput
        style={styles.input}
        value={hoursPerWeek}
        onChangeText={setHoursPerWeek}
        keyboardType="numeric"
        placeholder="40"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Current Employees (Months):</Text>
      <TextInput
        style={styles.input}
        value={currentEmployees}
        onChangeText={setCurrentEmployees}
        keyboardType="numeric"
      />

      <Text style={styles.label}>New Employees (Months):</Text>
      <TextInput
        style={styles.input}
        value={newEmployees}
        onChangeText={setNewEmployees}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Seasonal Employees (Months):</Text>
      <TextInput
        style={styles.input}
        value={seasonalEmployees}
        onChangeText={setSeasonalEmployees}
        keyboardType="numeric"
      />

      {/* Premium Info */}
      <Text style={styles.subheader}>Premium Information</Text>

      {[
        ['Premium Individual', premiumIndividual, setPremiumIndividual],
        ['Premium Cancer', premiumCancer, setPremiumCancer],
        ['Premium Accident', premiumAccident, setPremiumAccident],
        ['Premium Term Life', premiumLife, setPremiumLife],
        ['Premium Long Term Care', premiumLongTerm, setPremiumLongTerm],
      ].map(([label, value, setter]) => (
        <View key={label}>
          <Text style={styles.label}>{label}:</Text>
          <YesNoPicker value={value} onChange={setter} />
        </View>
      ))}

      {/* Plan Limits */}
      <Text style={styles.subheader}>Plan Limits</Text>

      <Text style={styles.label}>Expense Limit ($):</Text>
      <TextInput
        style={styles.input}
        value={expenseLimit}
        onChangeText={setExpenseLimit}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Carry Over Offered:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={carryOver}
          onValueChange={setCarryOver}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Option" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No"  value="No"  />
        </Picker>
      </View>

      <Text style={styles.label}>Carry Over Limit ($):</Text>
      <TextInput
        style={styles.input}
        value={carryOverLimit}
        onChangeText={setCarryOverLimit}
        keyboardType="numeric"
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {saving ? (
          <ActivityIndicator style={{ marginTop: 12 }} color="#fff" />
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.save]}
            onPress={handleSave}
          >
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
  subheader:{ fontSize: 18, fontWeight: 'bold', color: 'green', marginTop: 20, marginBottom: 10 },
  label:    { color: '#ccc', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#1a1a1a',
    color: YELLOW,                  // yellow input text
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  picker:      { color: YELLOW },   // selected value yellow
  pickerItem:  { color: YELLOW },   // dropdown rows yellow
  buttonRow:   { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  button:      { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  cancel:      { backgroundColor: '#333' },
  save:        { backgroundColor: 'green' },
  buttonText:  { color: '#fff', fontWeight: 'bold' },
});

export default PlanDetailsScreen;
