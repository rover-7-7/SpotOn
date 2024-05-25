import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMB1Vdj3-mHKB06yAx9AE3NnqE9vBOFqI",
  authDomain: "authentication-a2981.firebaseapp.com",
  projectId: "authentication-a2981",
  storageBucket: "authentication-a2981.appspot.com",
  messagingSenderId: "266110574101",
  appId: "1:266110574101:web:66e53120c152b02b51381c",
  databaseURL:
    "https://authentication-a2981-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export { auth, provider, database };
