import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AddFile from "./screens/AddFile";
import UploadedFilesScreen from "./screens/HomeScreen";
import OTP from "./screens/OTP";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileUploadScreen from "./screens/ProfileUploadScreen";
const Stack = createNativeStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeeFiles"
          component={UploadedFilesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={UploadedFilesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFile"
          component={AddFile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileUploadScreen"
          component={ProfileUploadScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
