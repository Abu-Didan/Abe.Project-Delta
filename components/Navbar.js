import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Modal } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [themeEnabled, setThemeEnabled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        <Switch
          value={themeEnabled}
          onValueChange={() => setThemeEnabled(!themeEnabled)}
          trackColor={{ false: "#777", true: "#f5d97c" }}
          thumbColor={themeEnabled ? "#f5d97c" : "#ccc"}
        />

        <TouchableOpacity onPress={() => setShowNotifications(true)}>
          <Ionicons name="notifications-outline" size={24} color="#f5d97c" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome name="user" size={24} color="#f5d97c" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowProfileMenu(true)}>
          <MaterialIcons name="menu" size={28} color="#f5d97c" />
        </TouchableOpacity>
      </View>

      {/* Notification Modal */}
      <Modal visible={showNotifications} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setShowNotifications(false)}>
          <View style={styles.dropdown}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Notifications</Text>
              <TouchableOpacity><Text style={styles.clearAll}>Clear All</Text></TouchableOpacity>
            </View>
            <Text style={styles.notificationText}>Unable to load notifications</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile Menu Modal (now triggered by the menu icon) */}
      <Modal visible={showProfileMenu} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setShowProfileMenu(false)}>
          <View style={styles.dropdownMenu}>
            <Text style={styles.menuItem}>Home</Text>
            <Text style={styles.menuItem}>Edit Profile</Text>
            <Text style={styles.menuItem}>Expenses</Text>
            <Text style={styles.menuItem}>Analytics</Text>
            <Text style={styles.menuItem}>Employee Journal</Text>
            <Text style={styles.menuItem}>Plan Documents</Text>
            <Text style={styles.menuItem}>Logout</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#022b16',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  dropdown: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 15,
    width: 280,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearAll: {
    color: '#f5d97c',
    fontWeight: '600',
  },
  notificationText: {
    color: '#aaa',
    marginTop: 10,
  },
  dropdownMenu: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 15,
    width: 280,
  },
  menuItem: {
    color: '#f5d97c',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    textAlign: 'center',
  },
});

export default Navbar;
