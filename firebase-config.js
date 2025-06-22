import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDgwXLQxKbWVqrpShp7JAR1q-yangkthaE",
  authDomain: "coffee-time-2be3c.firebaseapp.com",
  projectId: "coffee-time-2be3c",
  storageBucket: "coffee-time-2be3c.appspot.com", // Korrigerad URL!
  messagingSenderId: "975435064843",
  appId: "1:975435064843:web:d286112c099b6e8717c90e",
  measurementId: "G-TTX5FKJ28C",
};

// Initiera Firebase
const app = initializeApp(firebaseConfig);

// Exportera Firestore om du vill använda det
export const db = getFirestore(app);
export default app;
