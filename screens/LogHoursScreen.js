import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {
  Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons';
import { addHourLog } from '../services/profileService';
import { listHoursLogged } from '../services/profileService';
import { onSnapshot } from 'firebase/firestore';

const LogHoursScreen = () => {

  const [hoursModalVisible, setHoursModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputHours, setInputHours] = useState('');
  const [saving, setSaving] = useState(false);
  const [hourSummary, setHourSummary] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  /** Methods to update the hour report summary, based on sorting by date */
  useEffect(() => {
    const unsubscribe = onSnapshot(listHoursLogged(), (snapshot) => {
      const logs = snapshot.docs.map(doc => doc.data());
      updateHourSummary(logs);
    });

    return () => unsubscribe();
  }, []);

  const updateHourSummary = (logs) => {
    const now = new Date();
    let today = 0, week = 0, month = 0, year = 0;

    logs.forEach((log) => {
      const logDate = log.date?.toDate?.(); // handles Firebase Timestamp
      if (!logDate) return;

      const hours = parseFloat(log.hoursWorked) || 0;

      if (isSameDay(logDate, now)) today += hours;
      if (isSameWeek(logDate, now)) week += hours;
      if (isSameMonth(logDate, now)) month += hours;
      if (isSameYear(logDate, now)) year += hours;
    });

    setHourSummary({ today, week, month, year });
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isSameWeek = (d1, d2) => {
    const startOfWeek = (d) => {
      const day = d.getDay();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
    };
    return startOfWeek(d1).toDateString() === startOfWeek(d2).toDateString();
  };

  const isSameMonth = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth();

  const isSameYear = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear();

  /** Save and cancel methods for record hours modal */
  const handleSave = async () => {
    try {
      const hours = parseFloat(inputHours);
      if (isNaN(hours) || hours <= 0) {
        alert('Please enter a valid number of hours.');
        return;
      }

      await addHourLog({
        date: date,
        hoursWorked: hours,
      });

      setInputHours('');
      setHoursModalVisible(false);
    } catch (error) {
        console.error('Error saving hour log:', error);
        alert('Failed to save hour entry.');
    }
  };

  const handleCancel = () => {
    setHoursModalVisible(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Employee Journal</Text>

        <View style={styles.cardRow}>
          <FeatureCard icon={<Feather name="clock" size={28}
            color="#0f0f0f" />}
            title="Record Hours"
            onPress={() => setHoursModalVisible(true)}
          />

          <FeatureCard icon={<FontAwesome5 name="money-bill" size={28}
            color="#0f0f0f" />}
            title="Record Pay"
            onPress={() => setPayModalVisible(true)}
          />
        </View>

        <Modal isVisible={hoursModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Record Hours</Text>

            {/* Date Picker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputField}>
              <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
              <MaterialIcons name="calendar-today" size={20} color="#ccc" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            {/* Hours Input */}
            <TextInput
              style={styles.inputBox}
              placeholder="Hours Worked"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={inputHours}
              onChangeText={setInputHours}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleSave() }} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <SummarySection title="Hours Report Summary" data={[
          { label: 'Today', value: hourSummary.today.toFixed(1), unit: 'hours' },
          { label: 'This Week', value: hourSummary.week.toFixed(1), unit: 'hours' },
          { label: 'This Month', value: hourSummary.month.toFixed(1), unit: 'hours' },
          { label: 'This Year', value: hourSummary.year.toFixed(1), unit: 'hours' },
        ]} />

        <SummarySection title="W-2 Wage Report Summary" data={[
          { label: 'This Month', value: '$0', unit: 'paid' },
          { label: 'This Quarter', value: '$0', unit: 'paid' },
          { label: 'Year to Date', value: '$0', unit: 'paid' },
          { label: 'Total Payments', value: '0', unit: 'payments' },
        ]} />
      </ScrollView>

    </View>
  );
};

const FeatureCard = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const SummarySection = ({ title, data }) => (
  <View style={styles.summarySection}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <View style={styles.summaryGrid}>
      {data.map((item, index) => (
        <View key={index} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{item.value}</Text>
          <Text style={styles.summaryLabel}>{item.label}</Text>
          <Text style={styles.summaryUnit}>{item.unit}</Text>
        </View>
      ))}
    </View>
    <TouchableOpacity style={styles.reportButton}>
      <Text style={styles.reportButtonText}>View Full Report</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 40,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gold',
    paddingBottom: 6,
    alignSelf: 'center',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#006400',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 6,
  },
  iconCircle: {
    backgroundColor: 'gold',
    padding: 14,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  summarySection: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    padding: 12,
    width: '47%',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 22,
    color: 'gold',
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  summaryUnit: {
    fontSize: 12,
    color: '#888',
  },
  reportButton: {
    backgroundColor: 'gold',
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00ff00',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 4,
  },
  reportButtonText: {
    color: '#1c1c1c',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputBox: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputText: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
  },
  saveText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
  },
});

export default LogHoursScreen;