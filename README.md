A.D 7.17.25

Welcome to Reap 105, A React Native Expo project that streamlines benefit plan management for both Employees and Employers, 
featuring Firebase-powered authentication and data storage.

-----Implemented Features------

1. Firebase Integration

    Authentication: Email/password sign-up & login via Firebase Auth, with role selection (Employee vs. Employer).
    Database: Firestore used to persist user profiles, business info, expense records, and logged hours.
    Configuration: .env holds Firebase web config; services/firebase.js initializes Firebase SDK and exports Auth & Firestore instances.

2. Authentication & Role Management
    LoadingScreen: Determines auth state on launch.
    LoginScreen & SignupScreen: UI for sign-in/up with role toggle.
    AuthContext: React Context to manage user state, roles, and loading flags.

3. Navigation & Layout
    React Navigation (native-stack) with separate AuthStack and MainStack flows.
    Navbar: Custom component wrapping main screens, includes theme toggle and quick-access icons.

4. Employee-Side Workflows
    HomeScreen: Dashboard showing quick cards for core actions.
    ExpenseManagerScreen: Add expenses via form, camera scan, or voice note; list and filter entries stored in Firestore.
    ExpenseAnalyticsScreen: Chart-kit charts (pie, line, bar) visualizing expenses by category, month, and reimbursement status.
    LogHoursScreen: Record hours & calculate pay; summary cards for daily/weekly/monthly/yearly totals.
    PlanDocumentsScreen & PlanDetailsScreen: List and view benefit plan docs (uploads in Firestore Storage or mock PDF links).

5. Profile & Business Onboarding
    ProfileScreen & EditPersonalInfoScreen: Fetch and update user details from Firestore.
    BusinessListScreen: Select from existing businesses tied to user.
    BusinessInfoScreen: Form to add/edit business name, type, EIN, address, plan start date & type.
    SpouseInfoScreen: Capture spouse details when enrolled in family plan.
    Installation & Local Setup
        Clone the repo:
        git clone https://github.com/Abu-Didan/Abe.Project-Delta.git
        cd Abe.Project-Delta

    Environment: Copy .env.example to .env and populate Firebase web config.

    Dependencies:
    npm install
    #or yarn install

Run:
expo start
Testing: Use Expo Go on your device or simulators.



----Remaining Work------
    Employer Dashboard: Build screens for expense approvals, review employee hours, and company-wide metrics.
    Payment Processing: Integrate Stripe/PayPal/ACH for reimbursements and payroll.
    UI Polish: Refine theming, spacing, responsive layouts, and accessibility compliance.