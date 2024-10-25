import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/CustomButton";
import CustomButton from "../components/CustomButton";
import { LoginScreenProps } from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignupScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleSignup = async () => {
    if (name === "" || password === "") {
      Alert.alert("Error", "Please enter both name and password");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.1.6:5500/auth/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response);
      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);
      Alert.alert("Signup successful");
      navigation.navigate("AddFile", { user });
    } catch (error) {
      console.error("Signup error", error);
      Alert.alert("Signup error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Sign Up" onPress={handleSignup} color="#0376fd" />
      <Text style={styles.signupText}>
        Already have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
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
  button: {
    width: "100%",
    padding: 10,
    marginTop: 1,
    color: "#fefefe",
    backgroundColor: "#0376fd",
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

export default SignupScreen;
