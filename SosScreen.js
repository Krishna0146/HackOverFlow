import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SosScreen = ({ navigation }) => {
  const [timer, setTimer] = useState(20); // 2-minute timer (in seconds)

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      Alert.alert('Emergency!', 'Nearby users, hospitals, and police are being alerted.');
      // Call backend to notify emergency services or nearby users
      notifyEmergencyServices();
    }
  }, [timer]);

  // Function to handle emergency services notification
  const notifyEmergencyServices = () => {
    fetch('http://192.168.0.160:5000/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Emergency Alert Sent', time: new Date() }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Network response was not ok: ${response.status} ${text}`);
            });
        }
        return response.json();
    })
    .then(data => console.log('Emergency Alert Sent: ', data))
    .catch(error => console.error('Error sending alert: ', error));
};

  

  // Function to handle fake call
  const handleFakeCall = () => {
    // You can play a sound here to simulate a call or open the dialer
    // Alert.alert('Fake Call', 'Simulating a fake call...');

    // Optionally, you can open the dialer
    Linking.openURL('tel:1234567890'); // Uncomment to use
  };

  // Function to handle I'm Safe button
  const handleImSafe = () => {
    Alert.alert('Safe', 'You have marked yourself as safe.');
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Emergency Calling....</Text>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </View>

      {/* SOS Icon and Timer */}
      <View style={styles.sosContainer}>
        <LinearGradient colors={['#ff4e8f', '#ff4e8f', '#ff246a']} style={styles.sosButton}>
          <Ionicons name="alert-circle" size={100} color="#fff" />
        </LinearGradient>
        <Text style={styles.timerText}>
        <Text style={styles.timerText}>
         {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
        </Text>
        </Text>
        <Text style={styles.alertingText}>
          Alerting nearby users, hospitals, and police
        </Text>
      </View>

      {/* Fake Call and I'm Safe Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.fakeCallButton} onPress={handleFakeCall}>
          <Text style={styles.fakeCallText}>Fake Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.safeButton} onPress={handleImSafe}>
          <Text style={styles.safeText}>I'm Safe</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="location-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="people-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c0f2f',
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
  sosContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
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
  timerText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertingText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  fakeCallButton: {
    backgroundColor: '#ff4e8f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  safeButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  fakeCallText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeText: {
    color: '#ff4e8f',
    fontSize: 16,
    fontWeight: 'bold',
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

export default SosScreen;