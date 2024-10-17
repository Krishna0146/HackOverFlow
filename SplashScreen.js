import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient'; // Use Expo's LinearGradient
import tw from 'twrnc';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate to Login after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('OnBoard');
    }, 4000);
    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {/* Linear Gradient Background */}
      <LinearGradient 
        colors={['#ff7eb3', '#ffffff']} // Set your gradient colors here
        style={tw`absolute top-0 left-0 right-0 bottom-0`} // Cover entire background
      />
      
      {/* Animated Image */}
      <Animated.Image
        entering={FadeIn.duration(1000).delay(500)}
        style={tw`w-60 h-60`} // Equivalent to width and height in tw `w-60` and `h-60`
        source={require('../assets/womenintro.png')} // Ensure this path is correct
      />
    </View>
  );
}
