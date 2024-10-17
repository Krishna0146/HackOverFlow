import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import userLogo from '../assets/userlogo.png';

const UserSettings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, email } = route.params; // Extract username and email from route parameters

  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);

  const handleLogout = () => {
    // Logic to clear authentication or user data can be added here
    navigation.navigate('Login'); // Redirect to the Login screen
  };

  // Descriptions for About Us and Privacy Policy
  const aboutUsDescription = `
    We are dedicated to providing a safe and supportive environment for women. 
    Our mission is to empower women through information, community support, 
    and access to safety resources. Together, we can make a difference.
  `;

  const privacyPolicyDescription = `
    Your privacy is important to us. We are committed to protecting your 
    personal information and using it responsibly. This policy outlines how 
    we collect, use, and safeguard your data to ensure your privacy is respected.
  `;

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image source={userLogo} style={styles.logo} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('News')}>
          <Text style={styles.settingText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => setIsAboutModalVisible(true)}>
          <Text style={styles.settingText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => setIsPrivacyModalVisible(true)}>
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Section */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* About Us Modal */}
      <Modal
        visible={isAboutModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAboutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About Us</Text>
            <ScrollView>
              <Text style={styles.modalText}>{aboutUsDescription}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAboutModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        visible={isPrivacyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPrivacyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <ScrollView>
              <Text style={styles.modalText}>{privacyPolicyDescription}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPrivacyModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color for better contrast
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff', // White background for the profile section
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FF5733', // Border color to make it more attractive
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Darker color for better readability
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5733', // Bright color for section title
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    color: '#007BFF', // Bright blue for setting text
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto', // Push logout button to the bottom
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5733', // Bright color for modal title
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserSettings;
