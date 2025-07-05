import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BusinessInfoScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Sole Proprietor');
  const [ein, setEin] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [planDate, setPlanDate] = useState(new Date());
  const [showPlanDatePicker, setShowPlanDatePicker] = useState(false);
  const [planType, setPlanType] = useState('');

  const handleSave = () => {
    // TODO: Save to Firebase or local state
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Business Information</Text>

      <Text style={styles.label}>Business Name:</Text>
      <TextInput style={styles.input} value={businessName} onChangeText={setBusinessName} />

      <Text style={styles.label}>Business Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={businessType}
          onValueChange={(itemValue) => setBusinessType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sole Proprietor" value="Sole Proprietor" />
          <Picker.Item label="LLC" value="LLC" />
          <Picker.Item label="Partnership" value="Partnership" />
          <Picker.Item label="Corporation" value="Corporation" />
        </Picker>
      </View>

      <Text style={styles.label}>EIN:</Text>
      <TextInput style={styles.input} value={ein} onChangeText={setEin} />

      <Text style={styles.label}>Business Start Date:</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
        <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setShowStartDatePicker(false);
            if (selected) setStartDate(selected);
          }}
        />
      )}

      <Text style={styles.label}>Business Address:</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <Text style={styles.label}>City:</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>State:</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <Text style={styles.label}>ZIP Code:</Text>
      <TextInput style={styles.input} value={zip} onChangeText={setZip} keyboardType="numeric" />

      <Text style={styles.label}>Plan Start Date:</Text>
      <TouchableOpacity onPress={() => setShowPlanDatePicker(true)} style={styles.input}>
        <Text style={styles.dateText}>{planDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPlanDatePicker && (
        <DateTimePicker
          value={planDate}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setShowPlanDatePicker(false);
            if (selected) setPlanDate(selected);
          }}
        />
      )}

      <Text style={styles.label}>Plan Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={planType}
          onValueChange={(itemValue) => setPlanType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Plan Type" value="" />
          <Picker.Item label="Individual HRA" value="Individual HRA" />
          <Picker.Item label="Standard 105 Plan" value="Standard 105" />
        </Picker>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0f0f0f',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#ccc',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  dateText: {
    color: '#fff',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  picker: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#333',
  },
  save: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BusinessInfoScreen;
