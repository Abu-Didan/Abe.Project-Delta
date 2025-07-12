/**
 * Root navigation (unchanged order):
 * Loading → Login → everything else in a single nativestack.
 * Each main screen is wrapped with Layout so the Navbar shows everywhere.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* All current screens */
import LoadingScreen          from './screens/LoadingScreen';
import LoginScreen            from './screens/LoginScreen';
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

/*  SHARED NAVBAR */
import Navbar from './components/Navbar';

/*  WRAPPER */
function Layout({ children }) {
  return (
    <React.Fragment>
      {children}
      <Navbar />
    </React.Fragment>
  );
}

/* Helper HOC */
const withNavbar = (ScreenComponent) => (props) => (
  <Layout>
    <ScreenComponent {...props} />
  </Layout>
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        {/* Splash / auth screens (no navbar) */}
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login"   component={LoginScreen}   />

        {/* Main app screens wrapped with navbar */}
        <Stack.Screen name="Home"              component={withNavbar(HomeScreen)} />
        <Stack.Screen name="ExpenseManager"    component={withNavbar(ExpenseManagerScreen)} />
        <Stack.Screen name="ExpenseAnalytics"  component={withNavbar(ExpenseAnalyticsScreen)} />
        <Stack.Screen name="PlanDocuments"     component={withNavbar(PlanDocumentsScreen)} />
        <Stack.Screen name="LogHours"          component={withNavbar(LogHoursScreen)} />
        <Stack.Screen name="Profile"           component={withNavbar(ProfileScreen)} />
        <Stack.Screen name="EditPersonalInfo"  component={withNavbar(EditPersonalInfoScreen)} />
        <Stack.Screen name="BusinessInfoScreen" component={withNavbar(BusinessInfoScreen)} />
        <Stack.Screen name="SpouseInfoScreen"   component={withNavbar(SpouseInfoScreen)} />
        <Stack.Screen name="PlanDetailsScreen"  component={withNavbar(PlanDetailsScreen)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

