import React from "react";
import { FileCardProps } from "../utils";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
const FileCard = ({ driveLink, year, semester, subject, _id }: FileCardProps) => {
    const handleLinkPress = () => {
      Linking.openURL(driveLink.toString()).catch((err) =>
        console.error("Failed to open link:", err)
      );
    };

    return (
      <TouchableOpacity style={styles.card} onPress={handleLinkPress}>
        <Text style={styles.link}>Drive Link: {driveLink}</Text>
        <Text style={styles.detail}>Semester: {semester}</Text>
        <Text style={styles.detail}>Subject: {subject}</Text>
        <Text style={styles.detail}>Year: {year}</Text>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
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
  link: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
});

export default FileCard