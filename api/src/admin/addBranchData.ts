import { db } from "../utils/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const uploadBranchData = async (
  yearName: string, 
  branchName: string, 
  subjects: string[]
): Promise<void> => {
  try {
    const docRef = doc(db, "Data", yearName);

    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const existingData = docSnap.data();

      if(existingData[branchName]){
        await updateDoc(docRef, {
          [branchName]: arrayUnion(...subjects),
        });
        console.log(`Updated subjects for branch ${branchName}.`);
      }
      else{
        await updateDoc(docRef, {
          [branchName]: subjects,
        });
        console.log(`Created branch ${branchName} and added subjects.`);
      }
    }
    else{
      await setDoc(docRef, {
        [branchName]: subjects,
      });
      console.log(`Created document for year ${yearName} and added branch ${branchName} with subjects.`);
    }
  }
  catch(error){
    console.error("Error updating or creating document: ", error);
  }
};
