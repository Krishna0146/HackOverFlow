import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Svg, { Circle, Line } from 'react-native-svg';

const SpyCameraDetector = () => {
  const [magnetometer, setMagnetometer] = useState({ x: 0, y: 0, z: 0 });
  const [totalField, setTotalField] = useState(0);
  const [statusMessage, setStatusMessage] = useState('No Potential electronic device detected');

  useEffect(() => {
    // Subscribe to magnetometer updates
    const subscription = Magnetometer.addListener(({ x, y, z }) => {
      const total = Math.sqrt(x * x + y * y + z * z).toFixed(1);
      setMagnetometer({ x: x.toFixed(1), y: y.toFixed(1), z: z.toFixed(1) });
      setTotalField(total);
      setStatusMessage(total > 50 ? 'Potential electronic device detected!' : 'No Potential electronic device detected');
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const getGaugeRotation = () => {
    return Math.min(totalField, 100); // Limit max value to 100 for the gauge
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Spy Camera Detector</Text>
      <View style={styles.gaugeContainer}>
        <Svg height="200" width="200" viewBox="0 0 100 50">
          <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="transparent" />
          <Line
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos((180 - getGaugeRotation() * 1.8) * (Math.PI / 180))}
            y2={50 - 40 * Math.sin((getGaugeRotation() * 1.8) * (Math.PI / 180))}
            stroke="red"
            strokeWidth="2"
          />
        </Svg>
        <Text style={styles.magneticField}>{totalField} µT</Text>
      </View>

      <Text style={[styles.statusMessage, { color: totalField > 50 ? 'red' : 'green' }]}>
        {statusMessage}
      </Text>

      <View style={styles.xyzContainer}>
        <View style={styles.axisBox}>
          <Text style={styles.axisText}>X</Text>
          <Text style={styles.axisValue}>{magnetometer.x}</Text>
        </View>
        <View style={styles.axisBox}>
          <Text style={styles.axisText}>Y</Text>
          <Text style={styles.axisValue}>{magnetometer.y}</Text>
        </View>
        <View style={styles.axisBox}>
          <Text style={styles.axisText}>Z</Text>
          <Text style={styles.axisValue}>{magnetometer.z}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gaugeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  magneticField: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusMessage: {
    marginTop: 20,
    fontSize: 16,
  },
  xyzContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  axisBox: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  axisText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  axisValue: {
    fontSize: 18,
    color: 'green',
  },
});

export default SpyCameraDetector;
