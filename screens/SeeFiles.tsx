import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import FileCard from "../components/Card";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LoginScreenProps } from "../utils";
import { File } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../utils/ip";
const UploadedFilesScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userEmail = await AsyncStorage.getItem("userEmail");
        console.log("Email found in local storage from SeeFiles.tsx 25 ->", userEmail);
        if(!userEmail) console.log("No email found in local storage");
        const response = await axios.get(`${BASE_URL}uploads/get-all-files/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(`${BASE_URL}uploads/get-all-files/${userEmail}`);
        setFiles(response.data.uploadedFiles);
        console.log(response.data.uploadedFiles);
      } catch (error) {
        console.error("Error fetching files", error);
        Alert.alert("Error", "Unable to fetch files");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);
  const handleFilePress = (file: File) => {
    Alert.alert("File Selected", `You selected ${file.name}`);
  };
  const renderFileItem = ({ item }: { item: File }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => handleFilePress(item)}
    >
      <Text style={styles.fileName}>{item.name}</Text>
    </TouchableOpacity>
  );
  const handleAddFile = () => {
    navigation.navigate("AddFile");
  };
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0376fd" />
        <Text>Loading files...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Uploaded Files</Text>
        {files.map((file) => (
          <FileCard
            key={file._id.toString()}
            driveLink={file.driveLink}
            semester={file.semester}
            subject={file.subject}
            year={file.year}
          />
        ))}
        <TouchableOpacity style={styles.floatingButton} onPress={handleAddFile}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  fileItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  fileName: {
    fontSize: 18,
    fontWeight: "600",
  },
  fileType: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#0376fd",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UploadedFilesScreen;
