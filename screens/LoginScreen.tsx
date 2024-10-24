import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { LoginScreenProps } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.29.41:5500/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user, userEmail } = response.data;
      console.log("User email: ", userEmail);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userEmail", userEmail);
      Alert.alert("Login successful");
      navigation.navigate("SeeFiles", { user });
    } catch (error) {
      console.error("Login error", error);
      Alert.alert("Login failed", "Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton title="Login" onPress={handleLogin} color="#0376fd" />
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Signup")}
          >
            Signup
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  signupText: {
    marginTop: 10,
    fontSize: 14,
  },
  signupLink: {
    color: "#0376fd",
    fontWeight: "bold",
  },
});

export default LoginScreen;
