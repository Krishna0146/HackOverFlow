import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import tw from 'twrnc';


export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = async () => {

    try {
      console.log(password);
      if(email==="pavanadityakumarg2004@gmail.com" && password==="Krish123")
      {
        navigation.navigate('Authority');
      }
      else{
        const response = await axios.post('http://192.168.0.189:5500/login', {
          email: email,
          password: password
        });
        setEmail('')
        setPassword('')
        if (response.data.message === 'success') {
          console.log(response.data.data1.username)
          const username = response.data.data1.username;
          const email = response.data.data1.email;
          Alert.alert(
            'Login Successful',
            'Stay Updated,Stay Safe',
            [
              { 
                text: 'OK', 
                onPress: () => navigation.navigate('Home',{ username,email }) 
              },
            ]
          );
        } else if (response.data.message === 'check') {
          Alert.alert('Incorrect password. Please try again.');
        } else {
          Alert.alert('User not found');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Server error, please try again later.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res=await axios.post('http://192.168.0.189:5500/forgot-password', { email: forgotEmail });
      Alert.alert('Password reset link sent to your email.');
      setModalVisible(false); // Close the modal after successful request
      if(res.data.message==='User not found')
      {
        Alert.alert('user not found')
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      Alert.alert('Error sending password reset link. Please try again later.');
    }
  };

  return (
    <LinearGradient 
      colors={['#FF9897', '#F650A0']} // Set your gradient colors here
      style={tw`flex-1`} // Fill the entire screen
    >
      <StatusBar style="light" />

      {/* Lights */}
      <View style={tw`flex-row justify-around w-full absolute`}>
        <Animated.Image 
          entering={FadeInUp.delay(200).duration(1000).springify()} 
          style={tw`h-[225px] w-[90px]`} 
          source={require('../assets/kite.png')} 
        />
        <Image style={tw`h-[170px] w-[65px]`} source={require('../assets/pregnantwomen.png')} />
      </View>

      {/* Title and Form */}
      <View style={tw`h-full w-full flex justify-around pt-40 pb-10`}>
        {/* Title */}
        <View style={tw`flex items-center`}>
  <Animated.Image
    entering={FadeInUp.duration(1000).springify()}
    source={require('../assets/LOGIN_WORD-removebg-preview.png')}  // Replace with your image path
    style={tw`h-[150px] w-[225px]`}  // Adjust size as needed
  />
</View>

        {/* Form */}
        <View style={tw`flex items-center mx-4`}>
        <Animated.View entering={FadeInDown.duration(1000).springify()} 
        style={tw`bg-white/80 p-4 rounded-2xl w-full mb-4`}>
            <TextInput
              placeholder='Email'
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
              style={tw`text-black`}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} 
          style={tw`bg-white/80 p-4 rounded-2xl w-full mb-4 `}>
            <TextInput
              placeholder='Password'
              placeholderTextColor={'gray'}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={tw`text-black`}
            />
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(1000).delay(400).springify()} 
            style={tw`w-full mb-4`}
          >
            <TouchableOpacity 
              style={tw`w-full bg-sky-400 p-3 rounded-2xl`}
              onPress={handleLogin}  // Call login function on press
            >
              <Text style={tw`text-xl font-bold text-white text-center`}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(1000).delay(600).springify()} 
            style={tw`flex-row justify-center`}
          >
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('SignUp')}>
              <Text style={tw`text-sky-600`}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Forgot Password */}
          <Animated.View 
            entering={FadeInDown.duration(1000).delay(800).springify()} 
            style={tw`w-full flex-row justify-center mt-4`}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={tw`text-sky-600`}>Forgot Password?</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>  
      </View>  
      
      {/* Forgot Password Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-5 rounded-xl w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Forgot Password</Text>
            <TextInput 
              placeholder='Enter your email' 
              placeholderTextColor={'gray'} 
              value={forgotEmail} 
              onChangeText={setForgotEmail} 
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
            />
            <TouchableOpacity 
              style={tw`bg-sky-400 p-3 rounded`}
              onPress={handleForgotPassword}
            >
              <Text style={tw`text-white text-center font-bold`}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`mt-4`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-sky-600 text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
