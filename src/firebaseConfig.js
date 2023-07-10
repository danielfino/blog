// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlO5mVfLnD90SNO1AZBxfbp0MzFRDV7nw",
  authDomain: "plotu-21a4c.firebaseapp.com",
  projectId: "plotu-21a4c",
  storageBucket: "plotu-21a4c.appspot.com",
  messagingSenderId: "567402561879",
  appId: "1:567402561879:web:48790458076d0ce1a33e12",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
