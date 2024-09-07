import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AddIncome } from '../api';

const IncomeScreen = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleContinue = () => {
    const incomeData = {
      source,
      amount,
      date: date.toISOString(),
      description,
    };
    console.log(incomeData);

    var response = AddIncome(source, amount, date, description);

    console.log("response after adding income", response);
    // Handle form submission
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    if (Platform.OS !== 'ios') {
      setShowDatePicker(false);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income</Text>
      <Text style={styles.label}>How much?</Text>
      <TextInput
        style={styles.amountInput}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="₹0"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={source}
          onChangeText={setSource}
          placeholder="Source Of Income"
        />

        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />

        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>Pick Date</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#666',
  },
  dateText: {
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default IncomeScreen;
