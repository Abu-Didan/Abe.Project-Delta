import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExpenseManagerScreen from './screens/ExpenseManagerScreen';
import PlanDocumentsScreen from './screens/PlanDocumentsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Welcome'
          component = {WelcomeScreen}
          options={{ title: 'Welcome'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Plan Manager' }}
        />
        <Stack.Screen
          name="ExpenseManager"
          component={ExpenseManagerScreen}
          options={{ title: 'Expense Manager' }}
        />
        <Stack.Screen
          name="PlanDocuments"
          component={PlanDocumentsScreen}
          options={{ title: 'Plan Documents' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

