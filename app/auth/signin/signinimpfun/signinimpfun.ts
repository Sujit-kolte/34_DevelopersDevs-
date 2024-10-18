import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config"; // Adjust path to your firebase config

const getDocumentById = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};
export default getDocumentById;
