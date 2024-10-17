import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
interface File {
  id: string;
  name: string;
  type: string;
}
const uploadedFiles: File[] = [
  { id: "1", name: "ProjectProposal.pdf", type: "PDF" },
  { id: "2", name: "ProfilePic.png", type: "Image" },
  { id: "3", name: "Presentation.pptx", type: "PowerPoint" },
  { id: "4", name: "Budget.xlsx", type: "Excel" },
];
const UploadedFilesScreen: React.FC = ({ navigation }) => {
  const handleFilePress = (file: File) => {
    Alert.alert("File Selected", `You selected ${file.name}`);
  };

  const renderFileItem = ({ item }: { item: File }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => handleFilePress(item)}
    >
      <Text style={styles.fileName}>{item.name}</Text>
      <Text style={styles.fileType}>{item.type}</Text>
    </TouchableOpacity>
  );

  const handleAddFile = () => {
    navigation.navigate("AddFile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Files</Text>
      <FlatList
        data={uploadedFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderFileItem}
        ListEmptyComponent={<Text>No files uploaded yet.</Text>}
      />
      {/* Floating Button to Add File */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddFile}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
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
});

export default UploadedFilesScreen;
