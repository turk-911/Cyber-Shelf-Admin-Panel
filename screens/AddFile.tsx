import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utils/ip";
import { db } from "../utils/firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore"
const AddFile: React.FC = () => { 
  const [selectedYear, setSelectedYear] = useState<string>("1st");
  const [selectedBranch, setSelectedBranch] = useState<string>("IT");
  const [selectedSemester, setSelectedSemester] = useState<string>("1st");
  const [subject, setSubject] = useState<string>("LAL");
  const [pdf, setPdf] = useState("");
  const [type, setType] = useState("");
  const handleSubmit = async () => {
    if (!subject || !pdf) {
      Alert.alert("Error", "Please fill in all fields and select a file");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const userEmail = await AsyncStorage.getItem("userEmail");
      console.log(token);
      const response = await fetch(`${BASE_URL}uploads/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          driveLink: pdf,
          semester: selectedSemester,
          year: parseInt(selectedYear[0]),
          branch: selectedBranch,
          subject,
          userEmail: userEmail,
        }),
      });
      if (response.status === 200 || response.status === 201) {
        try {
          const docRef = doc(db, "Subjects", "1_LAL");
          await setDoc(docRef, {
            Materials: arrayUnion({
              "Content URL": pdf,
              Title: subject,
              id: `${selectedSemester}-${
                selectedYear[0]
              }-${selectedBranch}-${Date.now()}`,
            }),
          });
        } catch (error) {
          console.error("Error adding doc", error);
        }
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        Toast.show("Successfully uploaded!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: "green",
          textColor: "white",
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          containerStyle: {
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#033471",
            marginHorizontal: 30,
            elevation: 5,
            width: "90%",
          },
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          },
        });

      } else {
        const text = await response.text();
        console.log("Response text: ", text);
        Alert.alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      Alert.alert("Error", "Something went wrong. Please try again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView>
          <Text style={styles.title}>Add File</Text>
          <Text style={styles.label}>Select Year</Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            itemStyle={styles.itemStyle}
            style={styles.picker}
          >
            <Picker.Item label="1st Year" value="1st" />
            <Picker.Item label="2nd Year" value="2nd" />
            <Picker.Item label="3rd Year" value="3rd" />
            <Picker.Item label="4th Year" value="4th" />
          </Picker>
          <Text style={styles.label}>Select Branch</Text>
          <Picker
            selectedValue={selectedBranch}
            onValueChange={(itemValue) => setSelectedBranch(itemValue)}
            style={styles.picker}
            itemStyle={styles.itemStyle}
          >
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="IT-BIn" value="IT-BIn" />
            <Picker.Item label="ECE" value="ECE" />
          </Picker>
          <Text style={styles.label}>Select Semester</Text>
          <Picker
            selectedValue={selectedSemester}
            onValueChange={(itemValue) => setSelectedSemester(itemValue)}
            style={styles.picker}
            itemStyle={styles.itemStyle}
          >
            <Picker.Item label="1st Semester" value="1st" />
            <Picker.Item label="2nd Semester" value="2nd" />
            <Picker.Item label="3rd Semester" value="3rd" />
            <Picker.Item label="4th Semester" value="4th" />
            <Picker.Item label="5th Semester" value="5th" />
            <Picker.Item label="6th Semester" value="6th" />
            <Picker.Item label="7th Semester" value="7th" />
            <Picker.Item label="8th Semester" value="8th" />
          </Picker>
          <Text style={styles.label}>Select type:</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
            itemStyle={styles.itemStyle}
          >
            <Picker.Item label="Material" value="IT" />
            <Picker.Item label="Moderators" value="IT-BIn" />
            <Picker.Item label="Question Paper" value="ECE" />
          </Picker>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter subject"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={styles.input}
            placeholder="Paste a Google Drive link here"
            value={pdf}
            onChangeText={setPdf}
          />
          <CustomButton title="Submit" onPress={handleSubmit} color="#033471" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#033471",
  },
  label: {
    fontSize: 18,
    marginVertical: 12,
    color: "#001632",
    fontWeight: "600",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#001632",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#001632",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemStyle: {
    color: "#001632",
    backgroundColor: "#ffffff",
  },
});
export default AddFile;
