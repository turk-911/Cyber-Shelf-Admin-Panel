import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("someone@example.com");
  const [profilePic, setProfilePic] = useState<string>(
    "https://placekitten.com/200/200"
  );
  const [activeScreen, setActiveScreen] = useState("Profile");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedProfilePic = await AsyncStorage.getItem("profilePic");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedProfilePic) setProfilePic(storedProfilePic);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This feature is coming soon!");
  };

  const handleViewUploads = () => {
    const user = { name, email, profilePic };
    navigation.navigate("SeeFiles", user);
  };

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    if (screen !== "Profile") navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
            <Icon name="edit" size={24} color="#0376fd" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name || "Your Name"}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email || "example@mail.com"}</Text>
        </View>

        <Button title="View Uploads" onPress={handleViewUploads} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => handleNavigation("Home")}
        >
          <Icon
            name="home"
            size={30}
            color={activeScreen === "Home" ? "#0376fd" : "#666"}
          />
          <Text
            style={
              activeScreen === "Home" ? styles.activeScreenText : styles.tabText
            }
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => handleNavigation("AddFile")}
        >
          <Icon
            name="add-box"
            size={30}
            color={activeScreen === "AddFile" ? "#0376fd" : "#666"}
          />
          <Text
            style={
              activeScreen === "AddFile"
                ? styles.activeScreenText
                : styles.tabText
            }
          >
            Add File
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => handleNavigation("Profile")}
        >
          <Icon
            name="person"
            size={30}
            color={activeScreen === "Profile" ? "#0376fd" : "#666"}
          />
          <Text
            style={
              activeScreen === "Profile"
                ? styles.activeScreenText
                : styles.tabText
            }
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  footerItem: {
    alignItems: "center",
  },
  tabText: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  activeScreenText: {
    color: "#0376fd",
    fontSize: 12,
    marginTop: 4,
  },
});

export default ProfileScreen;
