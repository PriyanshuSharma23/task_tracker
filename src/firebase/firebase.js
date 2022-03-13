import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdZiImMZnQzTe4FTrp_XQ1ZwiuWZU6-Vw",
  authDomain: "task-tracker-9fc69.firebaseapp.com",
  projectId: "task-tracker-9fc69",
  storageBucket: "task-tracker-9fc69.appspot.com",
  messagingSenderId: "1071787334960",
  appId: "1:1071787334960:web:f8d0cd33186f769d44fcf5",
  measurementId: "G-NRJRZT9S5J",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};