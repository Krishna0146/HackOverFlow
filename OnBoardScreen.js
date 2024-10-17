import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';

// Sample data for onboarding
const slides = [
  {
    key: '1',
    title: 'Welcome to SheSafe',
    text: 'Your trusted safety companion for a secure and confident journey',
    image: require('../assets/womenborad1.png'), // Replace with your own image path
    backgroundColor: '#fff',
  },
  {
    key: '2',
    title: 'Why SheSafe?',
    text: 'Stay empowered with instant alerts, community support, and a simple SOS feature.',
    image: require('../assets/womenborad22.png'), // Replace with your own image path
    backgroundColor: '#fff',
  },

  {
    key: '3',
    title: 'Join Our Commmunity',
    text: 'Join  a community dedicated to keeping you safe and supported no matter where you are',
    image: require('../assets/womenboard3.png'),
    backgroundColor : '#fff',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();

  // Function to render each slide
  const renderSlide = ({ item }) => {
    return (
      <SafeAreaView style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </SafeAreaView>
    );
  };

  // When the onboarding finishes
  const onDone = () => {
    navigation.navigate('SignUp'); // Navigate to home or main screen after onboarding
  };

  // Skip onboarding
  const onSkip = () => {
    navigation.navigate('SignUp');
  };

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
      renderNextButton={() => <Text style={styles.buttonText}>Next</Text>}
      renderSkipButton={() => <Text style={styles.buttonText}>Skip</Text>}
      renderDoneButton={() => <Text style={styles.buttonText}>Get Started</Text>}
      activeDotStyle={styles.activeDot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f0126',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#ff4f7d',
    fontWeight: 'bold',
  },
  activeDot: {
    backgroundColor: '#ff4f7d',
    width: 10,
  },
});

export default OnboardingScreen;