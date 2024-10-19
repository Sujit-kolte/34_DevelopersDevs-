import { doc, getDoc } from "firebase/firestore"; // Import Firebase Firestore functions
import { db } from "../../../../firebase.config"; // Import the Firestore instance from your Firebase config

/**
 * Function to get a document by its ID from a specific Firestore collection.
 *
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docId - The document ID to retrieve from the collection.
 * @returns {Object | null} - Returns the document data if found, or null if the document doesn't exist.
 */
const getDocumentById = async (collectionName: string, docId: string) => {
  try {
    // Reference to the document in the specified collection
    const docRef = doc(db, collectionName, docId);

    // Attempt to fetch the document snapshot
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); // Log document data to the console for debugging
      return docSnap.data(); // Return the document data
    } else {
      console.log("No such document!"); // Log if no document exists with the given ID
      return null; // Return null if no document is found
    }
  } catch (error) {
    console.error("Error getting document:", error); // Log any errors encountered during document retrieval
  }
};

export default getDocumentById; // Export the function for use in other parts of the application
