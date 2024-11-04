import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { ProfileUploadScreenProps } from "../utils";
const ProfileUploadScreen: React.FC<ProfileUploadScreenProps> = ({ navigation }) => {
  const [image, setImage] = useState<string>("https://placekitten.com/200/200");
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSkip = () => {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Choose Profile Picture" onPress={pickImage} />
        <Button title="Finish" onPress={() => navigation.navigate("Home")} />
        <Button title="Skip" onPress={handleSkip} />
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
export default ProfileUploadScreen;
