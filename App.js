import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExpenseManagerScreen from './screens/ExpenseManagerScreen';
import PlanDocumentsScreen from './screens/PlanDocumentsScreen';
import ProfileScreen from './screens/ProfileScreen'; //Import ProfileScreen A.D (7.18.2025)
import EditPersonalInfoScreen from './screens/EditPersonalInfoScreen'; //NEW
import BusinessInfoScreen from './screens/BusinessInfoScreen'; //NEW
import SpouseInfoScreen from './screens/SpouseInfoScreen'; //NEW
import PlanDetailsScreen from './screens/PlanDetailsScreen'; //NEW
import LogHoursScreen from './screens/LogHoursScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="LogHours"
          component={LogHoursScreen}
          options={{ title: 'Log Hours' }}
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Your Profile' }}
        />
        <Stack.Screen
          name="EditPersonalInfo"
          component={EditPersonalInfoScreen}
          options={{ title: 'Edit Personal Info' }}
        />
        <Stack.Screen
          name="BusinessInfoScreen"
          component={BusinessInfoScreen}
          options={{ title: 'Business Info' }}
        />
        <Stack.Screen
          name="SpouseInfoScreen"
          component={SpouseInfoScreen}
          options={{ title: 'Spouse Info' }}
        />
        <Stack.Screen
          name="PlanDetailsScreen"
          component={PlanDetailsScreen}
          options={{ title: 'Plan Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
