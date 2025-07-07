import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const ExpenseManagerScreen = () => {
  // Simulated state: initially empty
  const [summaryData, setSummaryData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Simulate loading default values (replace this with API call later)
  useEffect(() => {
    setSummaryData([
      { label: 'Total Expenses', value: '$0.00', subtitle: '0 expenses', icon: 'money-bill' },
      { label: 'Approved', value: '$0.00', subtitle: '0 expenses', icon: 'check-circle' },
      { label: 'Reimbursed', value: '$0.00', subtitle: '0 expenses', icon: 'hand-holding-usd' },
      { label: 'Pending', value: '$0.00', subtitle: '0 expenses', icon: 'clock' },
    ]);

    setExpenses([]); // User hasn't submitted anything yet
  }, []);

  const actions = [
    { title: 'Add Medical Expense', icon: 'plus-square' },
    { title: 'Scan Receipt', icon: 'camera' },
    { title: 'Voice Entry', icon: 'microphone' },
    { title: 'Annual Expense Report', icon: 'file-alt' },
  ];

  // Add Medical Expense Pop-up
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState('');
  const [status, setStatus] = useState('Pending');

  const categoryOptions = [
    { label: 'Prescriptions', value: 'Prescriptions' },
    { label: 'Co-Pay', value: 'Co-Pay' },
    { label: 'Dental', value: 'Dental' },
    { label: 'Vision', value: 'Vision' },
    { label: 'Medical Equipment', value: 'Medical Equipment' },
    { label: 'Deductible', value: 'Deductible' },
    { label: 'Specialist', value: 'Specialist' },
    { label: 'Insurance', value: 'Insurance' },
  ];

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Reimbursed', value: 'Reimbursed' },
  ];

  const clearForm = () => {
    setDate(new Date());
    setCategory(null);
    setDescription(null);
    setAmount(null);
    setMember(null);
    setStatus(null);
  };

  const handleSave = () => {
    //TODO: implement saving logic
    setModalVisible(false);
    clearForm();
  };

  const handleCancel = () => {
    setModalVisible(false);
    clearForm();
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f0f0f' }} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 100 }}>
      <Text style={styles.title}>Expense Manager</Text>

      <View style={styles.summaryRow}>
        {summaryData.map((item, idx) => (
          <View key={idx} style={styles.summaryCard}>
            <FontAwesome5 name={item.icon} size={20} color="gold" />
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summarySubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Medical Expense Actions</Text>

      <View style ={styles.cardRow}>
        <FeatureCard icon={<FontAwesome5 name="plus-square" size={28} color = "#0f0f0f" />} 
          title = "Add Medical Expense"
          onPress={() => setModalVisible(true)}
        />
        <FeatureCard icon={<FontAwesome5 name="camera" size={28} color = "#0f0f0f" />} 
          title = "Scan Receipt"
        />
      </View>

      <View style ={styles.cardRow}>
        <FeatureCard icon={<FontAwesome5 name="microphone" size={28} color = "#0f0f0f" />} 
          title = "Voice Entry"
        />
        <FeatureCard icon={<FontAwesome5 name="file-alt" size={28} color = "#0f0f0f" />} 
          title = "Annual Expense Report"
        />
      </View>

      <Text style={styles.sectionHeader}>Your Medical Expenses</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Category</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
      </View>

      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>No medical expenses recorded yet.</Text>
      ) : (
        expenses.map((item, idx) => (
          <View key={idx} style={styles.expenseRow}>
            <Text style={styles.expenseText}>{item.date}</Text>
            <Text style={styles.expenseText}>{item.category}</Text>
            <Text style={styles.expenseText}>{item.amount}</Text>
            <Text style={[styles.expenseStatus, { color: 'limegreen' }]}>{item.status}</Text>
          </View>
        ))
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Medical Expense</Text>

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

          {/* Category */}
          <RNPickerSelect
            onValueChange={setCategory}
            items={categoryOptions}
            placeholder={{ label: 'Select a category', value: null }}
            style={pickerSelectStyles}
            value={category}
          />

          {/* Description */}
          <TextInput
            placeholder="Brief description of the expense..."
            placeholderTextColor="#666"
            style={styles.inputBox}
            value={description}
            onChangeText={setDescription}
          />

          {/* Amount */}
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#666"
            keyboardType="numeric"
            style={styles.inputBox}
            value={amount}
            onChangeText={setAmount}
          />

          {/* Member */}
          <TextInput
            placeholder="Name of family member..."
            placeholderTextColor="#666"
            style={styles.inputBox}
            value={member}
            onChangeText={setMember}
          />

          {/* Status */}
          <RNPickerSelect
            onValueChange={setStatus}
            items={statusOptions}
            value={status}
            style={pickerSelectStyles}
          />

          {/* Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleSave()}} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const FeatureCard = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    textAlign: 'center',
  },
  title: {
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
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#1c1c1c',
    width: '48%',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#ccc',
    marginTop: 8,
  },
  summaryValue: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  summarySubtitle: {
    color: '#888',
    fontSize: 12,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    backgroundColor: 'gold',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: 'gold',
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    color: '#ccc',
    width: '25%',
    fontWeight: 'bold',
    fontSize: 13,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  expenseText: {
    color: '#fff',
    width: '25%',
    fontSize: 13,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
  },
  expenseStatus: {
    fontWeight: 'bold',
    width: '25%',
    fontSize: 13,
    textAlign: 'right',
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

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  inputAndroid: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  placeholder: {
    color: '#888',
  },
};

export default ExpenseManagerScreen;
