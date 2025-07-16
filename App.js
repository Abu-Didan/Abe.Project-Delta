/**
 * Root navigation:
 * <AuthProvider>  ──>  decide AuthStack ⬄ MainStack
 */
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Auth wiring */
import { AuthProvider, AuthContext } from './context/AuthContext';

/* Auth screens */
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen   from './screens/LoginScreen';
import SignupScreen  from './screens/SignupScreen';

/* Main screens */
import HomeScreen             from './screens/HomeScreen';
import ExpenseManagerScreen   from './screens/ExpenseManagerScreen';
import ExpenseAnalyticsScreen from './screens/ExpenseAnalyticsScreen';
import PlanDocumentsScreen    from './screens/PlanDocumentsScreen';
import ProfileScreen          from './screens/ProfileScreen';
import EditPersonalInfoScreen from './screens/EditPersonalInfoScreen';
import BusinessInfoScreen     from './screens/BusinessInfoScreen';
import SpouseInfoScreen       from './screens/SpouseInfoScreen';
import PlanDetailsScreen      from './screens/PlanDetailsScreen';
import LogHoursScreen         from './screens/LogHoursScreen';

/* Shared navbar */
import Navbar from './components/Navbar';

/* ---------- Layout HOC ---------- */
function Layout({ children }) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
const withNavbar = (Screen) => (props) => (
  <Layout>
    <Screen {...props} />
  </Layout>
);

/* ---------- Auth stack ---------- */
const AuthStackNav = createNativeStackNavigator();
function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Login"  component={LoginScreen}  />
      <AuthStackNav.Screen name="Signup" component={SignupScreen} />
    </AuthStackNav.Navigator>
  );
}

/* ---------- Main stack ---------- */
const MainStackNav = createNativeStackNavigator();
function MainStack() {
  return (
    <MainStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNav.Screen name="Home"              component={withNavbar(HomeScreen)} />
      <MainStackNav.Screen name="ExpenseManager"    component={withNavbar(ExpenseManagerScreen)} />
      <MainStackNav.Screen name="ExpenseAnalytics"  component={withNavbar(ExpenseAnalyticsScreen)} />
      <MainStackNav.Screen name="PlanDocuments"     component={withNavbar(PlanDocumentsScreen)} />
      <MainStackNav.Screen name="LogHours"          component={withNavbar(LogHoursScreen)} />
      <MainStackNav.Screen name="Profile"           component={withNavbar(ProfileScreen)} />
      <MainStackNav.Screen name="EditPersonalInfo"  component={withNavbar(EditPersonalInfoScreen)} />
      <MainStackNav.Screen name="BusinessInfo"      component={withNavbar(BusinessInfoScreen)} />
      <MainStackNav.Screen name="SpouseInfo"        component={withNavbar(SpouseInfoScreen)} />
      <MainStackNav.Screen name="PlanDetails"       component={withNavbar(PlanDetailsScreen)} />
    </MainStackNav.Navigator>
  );
}

/* ---------- Root component ---------- */
function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingScreen />;        // waiting for Firebase to restore session
  return user ? <MainStack /> : <AuthStack />;  // switch stacks based on auth
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
