import React, { useState } from "react";
import { OTPScreenProps } from "../utils";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
const OTP: React.FC<OTPScreenProps> = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState<string>("");
  const handleVerifyOtp = async () => {
    if (otp === "") {
      Alert.alert("Error", "Please enter OTP");
      return;
    }
    try {
      const password = await AsyncStorage.getItem("userPassword");
      const name = await AsyncStorage.getItem("username");
      const response = await axios.post(`${BASE_URL}auth/verify-otp`, {
        email,
        name,
        otp,
        password,
      });
      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);
      Alert.alert("Verification successful", "User registered success");
      navigation.navigate("SeeFiles", { user });
    } catch (error) {
      console.error("OTP verification error.", error);
      Alert.alert("Verification failed", "Invalid OTP or OTP expired");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <CustomButton title="Verify" onPress={handleVerifyOtp} color="#0376fd" />
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
});
export default OTP;
