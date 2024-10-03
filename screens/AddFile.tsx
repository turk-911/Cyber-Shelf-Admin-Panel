import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from 'expo-document-picker'
import CustomButton from "../components/CustomButton";
const AddFile: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("1st");
  const [selectedBranch, setSelectedBranch] = useState<string>("IT");
  const [selectedSemester, setSelectedSemester] = useState<string>("1st");
  const [subject, setSubject] = useState<string>("");
  const [file, setFile] = useState<DocumentPickerResponse | null>(null);
  const [pdf, setPdf] = useState("");
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Cancelled", "No file was selected");
      } else {
        Alert.alert("Error", "Failed to pick the file");
      }
    }
  };

  const handleSubmit = () => {
    if (!subject || !file) {
      Alert.alert("Error", "Please fill in all fields and select a file");
      return;
    }
    Alert.alert(
      "Form Submitted",
      `Year: ${selectedYear}\nBranch: ${selectedBranch}\nSemester: ${selectedSemester}\nSubject: ${subject}\nFile: ${file?.name}`
    );
  };

  return (
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
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subject"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput style={styles.input} placeholder="Paste a Google Drive link here" value={pdf} onChangeText={setPdf} />
        <CustomButton title="Submit" onPress={handleSubmit} color="#033471" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#001632",
    borderRadius: 5,
    backgroundColor: "#fefefe",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#001632",
    borderRadius: 5,
    backgroundColor: "#fefefe",
    marginBottom: 20,
  },
  itemStyle: {
    color: '#001632',
    backgroundColor: '#fefefe'
  }
});

export default AddFile;
