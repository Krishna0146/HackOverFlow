import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const AdminHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Live Camera Feeds Section */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Live Camera Feeds</Text>
        <View style={styles.cameraView}>
          <Text style={styles.cameraLabel}>Camera 1-Main Entrance</Text>
          <View style={styles.cameraFeed} />
        </View>
        <View style={styles.cameraView}>
          <Text style={styles.cameraLabel}>Camera 2-Parking slot</Text>
          <View style={styles.cameraFeed} />
        </View>
        <Button title="View all cameras" onPress={() => {}} />
      </View>

      {/* Alert Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Alert Notifications:</Text>
        <View style={styles.alertRow}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.alertCard}>
              <Text style={styles.alertTime}>2 min ago</Text>
              <Text style={styles.alertTitle}>SOS Alert</Text>
              <Text style={styles.alertDesc}>SOS alert triggered near library</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Real-Time Gender Distribution */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Real-Time Gender Distribution</Text>
        <View style={styles.genderDistribution}>
          {/* Gender Pie Chart Placeholder */}
          <View style={styles.pieChart}></View>
          <View style={styles.genderLegend}>
            <View style={styles.legendItem}>
              <View style={styles.legendColorMale} />
              <Text>Male</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendColorFemale} />
              <Text>Female</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Hotspot Map */}
      <View style={styles.section}>
        <Text style={styles.headerText}>Hotspot Map</Text>
        {/* Hotspot Map Placeholder */}
        <View style={styles.hotspotMap}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  section: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraView: {
    marginBottom: 10,
  },
  cameraLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  cameraFeed: {
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  alertRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alertCard: {
    width: '45%',
    margin: 5,
    backgroundColor: '#d9e3f0',
    padding: 10,
    borderRadius: 10,
  },
  alertTime: {
    color: 'red',
    fontWeight: 'bold',
  },
  alertTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  alertDesc: {
    color: '#333',
  },
  genderDistribution: {
    alignItems: 'center',
  },
  pieChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc', // Placeholder for the pie chart
  },
  genderLegend: {
    marginTop: 10,
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  legendColorMale: {
    width: 20,
    height: 20,
    backgroundColor: '#4a90e2',
    marginRight: 5,
  },
  legendColorFemale: {
    width: 20,
    height: 20,
    backgroundColor: '#ff4081',
    marginRight: 5,
  },
  hotspotMap: {
    height: 200,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
});

export default AdminHomeScreen;