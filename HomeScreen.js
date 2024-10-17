import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { username,email } = route.params; // Extract username from route parameters
  const [isLongPress, setIsLongPress] = useState(false);
  const pressTimer = useRef(null);

  const new1=username;
  // Function to handle long press on SOS button
  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      navigation.navigate('SosScreen'); // Navigate to SosScreen after holding for 1 sec
    }, 1000); // 1 second delay
  };

  // Function to handle press release
  const handlePressOut = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current); // Clear the timer if press is released early
      pressTimer.current = null;
    }
    setIsLongPress(false);
  };

  return (
    <LinearGradient
      colors={['#ff7eb3', '#ffffff']} // Light pink and light blue gradient
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerText}>Welcome Back ! {username}</Text>
        <View>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}></Text>
          </View>
        </View>
      </View>

      {/* Subheading */}
      <Text style={styles.subheading}>Your SOS button is available if you need it</Text>

      {/* SOS Button */}
      <View style={styles.sosContainer}>
        <TouchableOpacity
          style={styles.sosButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={['#ff4e8f', '#ff4e8f', '#ff246a']}
            style={styles.gradient}
          >
            <Text style={styles.sosText}>SOS</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.sosInstruction}>
          Hold the SOS button to alert
        </Text>
        <Text style={styles.sosDetails}>
          This will notify your trusted contacts, nearby app users, and the closest hospitals and police stations.
        </Text>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home',{username})}>
          <Ionicons name="home-outline" size={30} color="#ff7eb3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map',{username})}>
          <Ionicons name="location-outline" size={30} color="#ff7eb3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CameraDetect')}>
          <Ionicons name="call-outline" size={30} color="#ff7eb3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSet',{ username, email })}>
          <Ionicons name="people-outline" size={30} color="#ff7eb3" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: -10,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  sosContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff246a',
    marginBottom: 20,
  },
  gradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  sosInstruction: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  sosDetails: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
