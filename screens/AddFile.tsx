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
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
const AddFile: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("1st");
  const [selectedBranch, setSelectedBranch] = useState<string>("IT");
  const [selectedSemester, setSelectedSemester] = useState<string>("1st");
  const [subject, setSubject] = useState<string>("LAL");
  const [pdf, setPdf] = useState("");
  const [type, setType] = useState("");

  const data = [
    {
      QuestionPapers: [
        {
          Type: "C1",
          Year: "2019",
          Title: "Review Test C1(19)",
          id: "201122172840",
          URL: "https://drive.google.com/uc?id=1HZnURaIaKHDY_rM9mNBbwQml970rTZnU&export=download",
        },
        {
          Type: "C1",
          Year: "2019",
          Title: "Quiz-1 C1(19)",
          id: "201122172843",
          URL: "https://drive.google.com/uc?id=1YRjhIs6JffyTZIPdlLozjbNaVY39Kl8x&export=download",
        },
        {
          Type: "C1",
          Year: "2019",
          Title: "Quiz-2 C1(19)",
          id: "201122172844",
          URL: "https://drive.google.com/uc?id=1Sd_teUOgzW06Nr5j8ZWO3t297dmmj2Xo&export=download",
        },
        {
          Type: "C2",
          Year: "2019",
          Title: "Review Test C2(19)",
          id: "201122172841",
          URL: "https://drive.google.com/uc?id=1ddIrjBhhbdVzFzf-6kHpO6JyVLjUeW12&export=download",
        },
        {
          Type: "C3",
          Year: "2019",
          Title: "Review Test C3(19)",
          id: "201122172842",
          URL: "https://drive.google.com/uc?id=1BR4lkRWd1zgdjyYCvkP_06H39qKsMtqh&export=download",
        },
      ],
      SubjectCode: "LAL",
      MODERATORS: [
        {
          "Contact Number": "+91 80812 04226",
          uid: "h31eb3tA5PRc2Be9ULRiEbMu2ap1",
          Name: "Priyansh Singh",
        },
      ],
      "Recommended Books": [],
      Material: [
        {
          "Content URL":
            "https://drive.google.com/uc?id=1VFA_L6lxChyR6xOvI258S6H1ZrHYJwbN",
          Title: "Lecture 1",
          id: "201122172801",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1o0QQqklVvmwrzUPx74m8G64vfNPnAQnC",
          Title: "Lecture 2",
          id: "201122172802",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=18Hje8QoIQO8aPe8fL6Ao9utJrZ0xXHXy&export=download",
          Title: "Lecture 3",
          id: "201122172803",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1A13xlFxj2s3GTO3EWpZecirUzt8rSvck&export=download",
          Title: "Lecture 4",
          id: "201122172804",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1NL84mn5AxVP3rFuLvs3k-yKZyc4xNHII&export=download",
          Title: "Lecture 5",
          id: "201122172805",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1H5-lcCqlR0BXN-zSrLG8NAWNOJAGIXVm&export=download",
          Title: "Lecture 6-7",
          id: "201122172806",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1zdxMZHh3es37-Ae1n3GvVuKcDwGzU7L7&export=download",
          Title: "Lecture 8-10",
          id: "201122172807",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1HkKsCHcLI6ZJ7vKHfKY7qI3tzqtwen67&export=download",
          Title: "Lecture 11-12",
          id: "201122172808",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=10x0rRv_NQw3pOealLmRuKtjD7jOtqojl&export=download",
          Title: "Lecture 13-14",
          id: "201122172809",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1TUJLMmRi2vsQ9VujxzhydZsEf3i7a7HE&export=download",
          Title: "Lecture 15-17",
          id: "201122172810",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=18v23QWAZYq8meeb81SK0K6PR2jKXa1iL&export=download",
          Title: "Lecture 18",
          id: "201122172811",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=12ZkXWKSTK7ej4B1TIgvzcsAATtCcs647&export=download",
          Title: "Lecture 19-21",
          id: "201122172812",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1SuKbJmYDKDHFGUCGTMVtMSoV3sa-hBfZ&export=download",
          Title: "Lecture 22-23",
          id: "201122172813",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1y_6HcHIg7B_eF1Hjtkb9WYgQGpBq-3Qc&export=download",
          Title: "Lecture 24-25",
          id: "201122172814",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1zGWuFjZQ_w9Ehn3t03yGCmXCELVXn7EQ&export=download",
          Title: "Problem set 1",
          id: "201122172815",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1G9XACzbpnn1njso2i1j7CnHfoqEFiIx5&export=download",
          Title: "Problem set I",
          id: "201122172816",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1n6V1nQp1Z7eDwUO6NVMp_8E4fUc4nOzp&export=download",
          Title: "Problem set 2",
          id: "201122172817",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1kc64uIQRjOBkn9GKPNsMnl4gxDNbTuz4&export=download",
          Title: "Problem set II",
          id: "201122172818",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1U2k6F_UdAz8izddkO8ZCVmnWix9kjtCo&export=download",
          Title: "Problem set 3",
          id: "201122172819",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=159UbgVmb2RNlv3xQM5bsjS9274x-_dMi&export=download",
          Title: "Problem set III",
          id: "201122172820",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1NP4_MbKds_Vg7ikrI8m6CUal1HjvCEz7&export=download",
          Title: "Problem set 5",
          id: "201122172821",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1o1bxLdiza8d-92w1z-XA_8EEj3qCBWN4&export=download",
          Title: "Problem set-VI",
          id: "201122172822",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1U-3TktICMxVXrSaK9jHWhd43jbSaBMPu&export=download",
          Title: "Tutorial sheet 1",
          id: "201122172823",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1kq1Ir_1AC8zw5P22ssgSznaG6qszx3vO&export=download",
          Title: "Tutorial sheet 2",
          id: "201122172824",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=12qPub5AIBIYN8as-D3_IpguhGdbmWHks&export=download",
          Title: "Tutorial sheet 3",
          id: "201122172825",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1a1x14DLm7DAJekcxoMfvGKFuW7z25Cgg&export=download",
          Title: "Tutorial sheet 4",
          id: "201122172826",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1C7E5cLa_SUqO8T6ZpiqiM-X6Ye_Sss4H&export=download",
          Title: "Tutorial sheet 5",
          id: "201122172827",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1FzgYJsZnn6UeUsowqATLuPblvZsNNiLy&export=download",
          Title: "Assignment Batch 2",
          id: "201122172828",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1ibzXkDTI1R3OZUlwu7fxnef18VOvvn0K&export=download",
          Title: "Assignment Batch 3",
          id: "201122172829",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1ok0YAqB5hkfgRRCT8BEDCE69kL2N_BE4&export=download",
          Title: "Assignment Batch 4",
          id: "201122172830",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1S75ruq-s_zjBURehuWfSDnPcE3RNYYxb&export=download",
          Title: "Assignment Batch 5",
          id: "201122172831",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1NOiUDKudL8c94Wyr35gJgKthQW0Zskc0&export=download",
          Title: "Assignment Batch 6",
          id: "201122172832",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1X6EPbOH50u8v4ytr2U6M0f_JUNE5_14J&export=download",
          Title: "Assignment Batch 7",
          id: "201122172833",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1WuvM0k6Miiz7xqzqw7EeKvsNpTEtcSVo&export=download",
          Title: "Assignment Batch 8",
          id: "201122172834",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=12rtuKKzqzGRiZAF2unkztqIF4txOzUI7&export=download",
          Title: "G7-G10 (Batch 1)",
          id: "201122172835",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=13BnO7_JGP9lBy19p5jue_9RItVrrOkKj&export=download",
          Title: "G7-G10 (Batch 4)",
          id: "201122172836",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1Repq8QlXga9O1DhSaPfC5UrPQqNv744o&export=download",
          Title: "G7-G10 (Batch 5)",
          id: "201122172837",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=10V14fLmb7NV1ceIXK6p1apIBXcr-btbw&export=download",
          Title: "G7-G10 (Batch 6)",
          id: "201122172838",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1iwpeG__LwLTx7qUxgYjcRu6j4MjyezAZ&export=download",
          Title: "G7-G10 (Batch 8)",
          id: "201122172839",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1pc-6G2zZayUB7zAZ8IMJJOSipsqrrSRx&export=download",
          Title: "Schaum's Outline of Theory and Problems of Linear Algebra",
          id: "201122172845",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1VaRPSmOBZV3ByqgogFilcvQk4a-B_dD8&export=download",
          Title: "Linear Algebra",
          id: "201122172846",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1w7AboD8h6t7BfOFCM95rbD-Wug30iNA3&export=download",
          Title: "S. Kumaresan, Linear algebra - A Geometric approach",
          id: "201122172847",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1eHX9tkFhq5AtPXDtL5J59URLS7-ryJLC&export=download",
          Title: "Textbook K HOFFMAN",
          id: "201122172848",
        },
        {
          "Content URL":
            "https://drive.google.com/uc?id=1mgS2-LlVJiMa5cLGd1bv9w6wI7FghWmC&export=download",
          Title: "S. Lang, Introduction to Linear Algebra, Springer",
          id: "201122172849",
        },
      ],
      "Important Links": [
        {
          "Content URL":
            "https://www.youtube.com/playlist?list=PLdM-WZokR4taLvoJPvfHwF8m0Q1K6Qvmz",
          Title: "Vector Space, Matrix Theory Playlist",
        },
        {
          "Content URL":
            "https://www.youtube.com/playlist?list=PLdM-WZokR4tYxOsDe1s9QSWsVQBHfemd0",
          Title: "Vector Space, Subspace playlist",
        },
        {
          "Content URL":
            "https://www.youtube.com/playlist?list=PLdM-WZokR4tYGuV7IozQ3-F86kOPCXRrp",
          Title: "Inner product space playlist",
        },
        {
          "Content URL":
            "https://drive.google.com/file/d/1JuknTpuTivy0TWUWsn7Ry00yaQladlwx/view?usp=drivesdk",
          Title: "Linear Algebra Notes",
        },
        {
          "Content URL": "https://yutsumura.com/tag/linear-algebra/",
          Title: "Solved Examples in LAL Topicwise",
        },
        {
          "Content URL": "http://home.iitk.ac.in/~arlal/mth102a.htm",
          Title: "IITK Lecture notes (Dr. Arbind K Lal)",
        },
        {
          "Content URL": "http://home.iitk.ac.in/~santosha/MTH102.html",
          Title: "IITK Lecture notes (Dr. Santosha kr)",
        },
      ],
    },
  ];

  async function pushToSpecificSubject() {
    try {
      const subjectCode = "1_LAL"; 
      const subjectData = data[0]; 
      const docRef = doc(db, "Subjects", "1_LAL");
      await setDoc(docRef, {
        SubjectCode: subjectData.SubjectCode,
        MODERATORS: subjectData.MODERATORS,
        "Recommended Books": subjectData["Recommended Books"],
        "Important Links": subjectData["Important Links"],
        Material: subjectData.Material,
        QuestionPapers: subjectData.QuestionPapers,
      });

      console.log(
        `Data successfully pushed to ${subjectCode} subject in Firestore!`
      );
    } catch (error) {
      console.error("Error pushing data to Firestore:", error);
    }
  }

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
          await updateDoc(docRef, {
            Material: arrayUnion({
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
