import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Add axios for sending the data
import { useRoute } from '@react-navigation/native';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [highRiskAreas, setHighRiskAreas] = useState([]); // For safety alerts

  const route = useRoute();
  const { username } = route.params;

  // Static police station data
  const policeStations = [
    {
      latlng: { latitude: 16.5449, longitude: 81.5173 },
      title: 'Bhimavaram Two Town Police Station',
      description: 'Bhimavaram Dongapindi Road, Balusumoodi, Bhimavaram, Andhra Pradesh, 534202',
    },
    {
      latlng: { latitude: 16.5402, longitude: 81.5219 },
      title: 'CCS Police Station',
      description: 'Mavullama Temple Street, Gandhi Nagar, Bhimavaram, Andhra Pradesh, 534201',
    },
    {
      latlng: { latitude: 16.5436, longitude: 81.5240 },
      title: 'One Town Police Station',
      description: 'Gandhinagar, Bhimavaram, Andhra Pradesh, 534201',
    },
  ];

  // Define custom map style at the component level
  const customMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f9e5b5"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9c6b3b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c77c3c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e0c081"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e2b73a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#b78b28"
        }
      ]
    }
  ];

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to enable location permission to access this feature.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Set region state
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      // Set nearby contacts (you will need to implement this logic)
      setMarkers([
        { 
          latlng: { latitude: latitude + 0.001, longitude: longitude + 0.001 }, 
          title: 'Sai Krishna', 
          description: 'brother' 
        },
        { 
          latlng: { latitude: latitude - 0.001, longitude: longitude - 0.001 }, 
          title: 'Jane Smith', 
          description: 'Coworker' 
        },
      ]);

      // Sample high-risk areas (This should come from a real-time data source)
      setHighRiskAreas([
        { latlng: { latitude: latitude + 0.005, longitude: longitude + 0.005 }, title: 'High Risk Area', description: 'Recent incidents reported' },
      ]);
    };

    getLocation();
  }, []);

  const onRegionChange = (region) => {
    console.log(region);
  };

  // Function to handle SOS emergency alert
  const handleEmergencyAlert = async () => {
    try {
      const { latitude, longitude } = region;

      const emergencyData = {
        username,
        latitude,
        longitude,
        message: 'Emergency alert triggered!',
      };

      await axios.post('http://192.168.0.189:5500/send-alert', emergencyData);
      console.log('successfully send data to authority')
      Alert.alert('Emergency Alert', 'Your emergency contacts have been notified!');

    } catch (error) {
      console.error('Error sending emergency alert:', error);
      Alert.alert('Error', 'Unable to send emergency alert. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            onRegionChangeComplete={onRegionChange}
            customMapStyle={customMapStyle} // Apply custom map style
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
            {highRiskAreas.map((area, index) => (
              <Marker
                key={index}
                coordinate={area.latlng}
                title={area.title}
                description={area.description}
              >
                {/* Custom view for high-risk areas */}
                <View style={styles.highRiskMarker}>
                  <Text style={styles.highRiskText}>{area.title}</Text>
                </View>
              </Marker>
            ))}
            {policeStations.map((station, index) => (
              <Marker
                key={index}
                coordinate={station.latlng}
                title={station.title}
                description={station.description}
                pinColor="blue" // Police stations in blue
              />
            ))}
          </MapView>

          {/* Emergency SOS Button */}
          <TouchableOpacity style={styles.sosButton} onPress={handleEmergencyAlert}>
            <Ionicons name="alert-circle" size={30} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sosButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  highRiskMarker: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Semi-transparent red
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'darkred',
    elevation: 3, // Shadow effect for better visibility
  },
  highRiskText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
