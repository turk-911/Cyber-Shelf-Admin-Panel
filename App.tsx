import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen"
import AddFile from "./screens/AddFile"
import UploadedFilesScreen from "./screens/SeeFiles";
const Stack = createNativeStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SeeFiles" component={UploadedFilesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
