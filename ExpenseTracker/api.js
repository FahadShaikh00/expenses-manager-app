import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://expensemanager.somee.com/API/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
 // console.log('Request:', config); // Add logging
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
   // console.error('Response Error:', error.response); // Add logging
    return Promise.reject(error);
  }
);

export const register = async (name, email, phone, password) => {
  try {
    const response = await api.post('/Users/register', { name, email, phone, password });
    // console.log('Register Response:', response.data); // Add logging
    return response.data;
  } catch (error) {
   // console.error('Register Error:', error.response.data); // Add logging
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/Users/login', { email, Password: password });
    console.log('Login Response:',response.data); // Add logging
    const { token } = response.data;
    await AsyncStorage.setItem('jwt_token', token);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data); // Add logging
    throw error;
  }
};

export const AddIncome = async (source,amount,date,description) =>{
try{
  const response = await api.post('/Incomes', {source,amount,date});
  return response;
}catch(error){
  console.log('AddIncome Error:', error); // Add logging
}
} 

export const apiRequest = async (url, options = {}) => {
  try {
    const response = await api(url, options);
   // console.log('API Request Response:', response.data); // Add logging
    return response.data;
  } catch (error) {
   // console.error('API Request Error:', error.response.data); // Add logging
    throw error;
  }
};
