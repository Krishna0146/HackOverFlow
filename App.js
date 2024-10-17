import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginscreen.js';
import SignupScreen from './screens/signupscreen.js';
import SplashScreen from './screens/SplashScreen.js'; // Import the new splash screen
import OnboardingScreen from './screens/OnBoardScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import SosScreen from './screens/SosScreen.js';
import MapScreen from './screens/MapScreen.js';
import UserSettings from './screens/UserSettings.js';
import SpyCameraDetector from './screens/CameraDetect.js';
import WomenSafetyArticles from './screens/News.js';
import AdminHomeScreen from './screens/Authority.js';

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoard" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SosScreen" component={SosScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="UserSet" component={UserSettings} />
        <Stack.Screen name="CameraDetect" component={SpyCameraDetector} />
        <Stack.Screen name="News" component={WomenSafetyArticles} />
        <Stack.Screen name="Authority" component={AdminHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
