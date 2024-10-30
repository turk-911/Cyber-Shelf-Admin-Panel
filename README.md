
**Cyber Shelf Admin App**

The **Cyber Shelf Admin App** is a mobile application designed to empower administrators by enabling them to upload and manage educational resources. Admins can choose the  **year, semester, and subject** , and upload files such as notes, assignments, and study materials. The app ensures smooth navigation across different sections like  **Home, Add File, and Profile** , with easy access to uploaded content.

**Features**

**	**•**	** **Upload Resources** : Select the **year, semester, and subject** to upload educational resources.

**	**•**	** **View Uploaded Files** : Display and manage files with metadata like subject, semester, year, and associated drive link.

**	**•**	** **Pull-to-Refresh** : Quickly refresh the list of files with a pull-down gesture.

**	**•**	** **Navigation Tabs** : Seamlessly switch between **Home, Add File, and Profile** screens with intuitive bottom navigation.

**	**•**	** **JWT-based Authentication** : Secure login to ensure only admins can upload and view files.

**Tech Stack**

**	**•**	** **Frontend** : React Native, Expo

**	**•**	** **Backend** : Node.js

**	**•**	** **Language** : TypeScript

**Installation & Setup**

**Prerequisites**

**	**•**	**Node.js and npm installed

**	**•**	**React Native & Expo CLI set up ([Guide](https://reactnative.dev/docs/environment-setup))

**	**•**	**Android Studio / Xcode (for emulation or physical device testing)

**	**•**	**Backend API for file management

**1. Clone the Repository**

git clone https://github.com/turk-911/cyber-shelf-admin-app.git

cd cyber-shelf-admin-app

**2. Install Dependencies**

npm install

**3. Run the App**

expo start

**	**•**	** **For Android** : Press **a** or scan the QR code with Expo Go.

**	**•**	** **For iOS** : Press **i** to open the app in an iOS emulator or scan the QR code with Expo Go.

**Backend API Configuration**

**	**1.**	**Add your backend **IP address and port** in the **/utils/ip.ts** file:

**export**const** BASE_URL = **"http://`<your-ip>`:`<your-port>`/"**;**

**	**2.**	**Ensure the backend is running with proper  **upload and authentication routes** **.**

Example API route for fetching uploaded files:

GET /uploads/get-all-files/:userEmail

**Screens Overview**

**1. Login and Signup**

Admins log in using their credentials to access the app. JWT-based tokens are stored in **AsyncStorage** to maintain the session.

**2. Home Screen**

Displays the list of uploaded files. Admins can refresh the list using the **pull-to-refresh** feature.

**3. Add File Screen**

Allows the admin to:

**	**•**	**Select **Year, Semester, and Subject**

**	**•**	**Upload files using cloud services and link them via the drive link.

**4. Profile Screen**

Admins can view their profile details and edit them in future updates.

**Navigation**

**	**•**	** **Bottom Tab Navigation** :

**	**•**	** **Home** : View all uploaded files

**	**•**	** **Add File** : Upload new files

**	**•**	** **Profile** : View and manage profile

**	**•**	**Active screen indicators ensure users always know their current location within the app.

**Contributing**

Contributions are welcome! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/turk-911/cyber-shelf-admin-app).

**License**

This project is licensed under the  **MIT License** .

**Contact**

If you encounter any issues or have suggestions, feel free to open an issue on GitHub or reach out to the maintainer.

Enjoy using the **Cyber Shelf Admin App** and make resource management easier! 🎉
