// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3O1kSZnla0DBu_z7WEFMCBAYoIqlcauM",
  authDomain: "rapidaid-89e5f.firebaseapp.com",
  projectId: "rapidaid-89e5f",
  storageBucket: "rapidaid-89e5f.appspot.com",
  messagingSenderId: "151990165555",
  appId: "1:151990165555:web:f794a7fa27731717db4346",
  measurementId: "G-0FT9EV4LP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
