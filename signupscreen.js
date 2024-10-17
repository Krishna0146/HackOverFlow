import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios for making HTTP requests
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import tw from 'twrnc'; 


export default function SignupScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.0.189:5500/signup', {
        username,
        email,
        password
      });
      console.log("success")
      if (response.data.message === 'success') {
        Alert.alert(
          'Sign Up Successful',
          'You have successfully signed up.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('Home', { username,email }) // Pass username here
            },
          ]
        );
      } else if (response.data.message === 'User already exists') {
        Alert.alert('User already exists. Please try logging in.');
      } else {
        Alert.alert('Sign Up Failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      Alert.alert('Server error, please try again later.');
    }
  };

  return (
    <LinearGradient 
      colors={['#FF9897', '#F650A0']}// Set your gradient colors here
      style={tw`flex-1`} // Fill the entire screen
    >
      <StatusBar style="light" />
      {/* Lights */}
      <View style={tw`flex-row justify-around w-full absolute`}>
        <Animated.Image 
          entering={FadeInUp.delay(200).duration(1000).springify()} 
          style={tw`h-[150px] ml-26 mt-40 w-[150px]`} 
          source={require('../assets/womenintro1.webp')} 
        />
        <Image style={tw`h-[160px] w-[60px]`} source={require('../assets/kite.png')} />
      </View>
      
      {/* Title and Form */}
      <View style={tw`h-full w-full flex justify-around pt-64`}>
        {/* Title */}
        <View style={tw`flex items-center`}>
          <Animated.Text 
            entering={FadeInUp.duration(1000).springify()} 
            style={tw`text-white font-bold tracking-wider text-5xl`}
          >
            Sign Up
          </Animated.Text>
        </View>

        {/* Form */}
        <View style={tw`flex items-center mx-4 mb-4`}>
          <Animated.View 
            entering={FadeInDown.duration(1000).springify()} 
            style={tw`bg-white/80 p-4 rounded-2xl w-full`}
          >
            <TextInput 
              placeholder="Username" 
              placeholderTextColor={'gray'} 
              value={username}
              onChangeText={setUsername}  // Set username input
            />
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(1000).delay(200).springify()} 
            style={tw`bg-white/80 p-4 rounded-2xl w-full mt-3`}
          >
            <TextInput 
              placeholder="Email" 
              placeholderTextColor={'gray'} 
              value={email}
              onChangeText={setEmail}  // Set email input
            />
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(1000).delay(400).springify()} 
            style={tw`bg-white/80 p-4 rounded-2xl w-full mb-5 mt-3`}
          >
            <TextInput 
              placeholder="Password" 
              placeholderTextColor={'gray'} 
              secureTextEntry 
              value={password}
              onChangeText={setPassword}  // Set password input
            />
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(1000).delay(600).springify()} 
            style={tw`w-full`}
          >
            <TouchableOpacity 
              style={tw`w-full bg-sky-400 p-3 rounded-2xl mb-3`}
              onPress={handleSignUp}  // Call sign-up function on press
            >
              <Text style={tw`text-xl font-bold text-white text-center`}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View 
            entering={FadeInDown.duration(1000).delay(800).springify()} 
            style={tw`flex-row justify-center `}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text style={tw`text-sky-600`}> Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>  
      </View>  
    </LinearGradient>
  );
}
