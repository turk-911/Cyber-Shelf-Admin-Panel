import { db } from "../utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { books, links, material, moderators, quespaper } from "../types/subject_data";

export const uploadData = async (
  sem: string, 
  subjectCode: string, 
  importantLinks: links[] = [], 
  moderators: moderators[] = [], 
  material: material[] = [], 
  ques: quespaper[] = [], 
  book: books[] = []
): Promise<void> => {
  try {
    const docId = `${sem}_${subjectCode}`;
    const docRef = doc(db, "Subjects", docId);

    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const updates: Record<string, any> = {};

      if(importantLinks.length > 0){
        updates["Important Links"] = arrayUnion(...importantLinks);
      }
      if(moderators.length > 0){
        updates["MODERATORS"] = arrayUnion(...moderators);
      }
      if(material.length > 0){
        updates["Material"] = arrayUnion(...material);
      }
      if(ques.length > 0){
        updates["QuestionPapers"] = arrayUnion(...ques);
      }
      if(book.length > 0){
        updates["Recommeneded Books"] = arrayUnion(...book);
      }

      if(Object.keys(updates).length > 0){
        await updateDoc(docRef, updates);
        console.log("Data updated successfully.");
      }
      else{
        console.log("No data to update.");
      }
    }
    else{
        await setDoc(docRef, {
            "Important Links": importantLinks,
            "MODERATORS": moderators,
            "Material": material,
            "QuestionPapers": ques,
            "Recommeneded Books": book,
        });
        console.log(`Document ${docId} created successfully with initial data.`);
    }
  }
  catch(error){
    console.error("Error updating document: ", error);
  }
};
