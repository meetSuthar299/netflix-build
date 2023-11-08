import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7GabKg0MrGjshuu76dyDiDpV9Egy1hlM",
  authDomain: "netflix-clone-a23bc.firebaseapp.com",
  projectId: "netflix-clone-a23bc",
  storageBucket: "netflix-clone-a23bc.appspot.com",
  messagingSenderId: "74480555678",
  appId: "1:74480555678:web:83e89f5e0ba992559fcd8f"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db; 