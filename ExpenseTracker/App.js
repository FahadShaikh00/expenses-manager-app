import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Components/SignUpScreen';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import AuthLoadingScreen from './Components/AuthLoadingScreen';
import IncomeScreen from './Components/IncomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen 
          name="AuthLoading" 
          component={AuthLoadingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen 
          name="Income" 
          component={IncomeScreen} 
          options={{ title: 'Add Income' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
