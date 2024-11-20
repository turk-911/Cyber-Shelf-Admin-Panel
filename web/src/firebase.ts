import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { apiKey, appId, authDomain, bucket, projectId, senderId } from "./utils";
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: bucket,
    messagingSenderId: senderId,
    appId: appId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;