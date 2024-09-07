import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await fetch('http://expensemanager.somee.com/API/api/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          passwordHash: password,
          phone: phone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful registration (e.g., navigate to login screen)
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');
      } else {
        // Handle error response
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={[styles.input, styles.passwordContainer]}>
        <TextInput
          style={styles.inputpass}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.icon}>
          <Text>👁️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>
          By signing up, you agree to the
          <Text style={styles.link}> Terms of Service and Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or with</Text>

      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => { /* Handle Google Sign Up */ }}>
        <Text style={styles.googleButtonText}><AntDesign name="google" size={24} color="#6A4BFF" /> Sign Up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Income')}>
        <Text style={styles.loginText}>Goto Income Test</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputpass: {
    height: 50,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  link: {
    color: 'blue',
  },
  button: {
    backgroundColor: '#6A4BFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#ccc',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  googleButtonText: {
    color: '#6A4BFF',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: 'blue',
  },
});
