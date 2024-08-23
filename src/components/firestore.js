// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6LSkfag2TdrWOlwiuS1iajzpxQuHInVM",
  authDomain: "firesuser-66bde.firebaseapp.com",
  projectId: "firesuser-66bde",
  storageBucket: "firesuser-66bde.appspot.com",
  messagingSenderId: "1073707334690",
  appId: "1:1073707334690:web:bcb9e117dae2bbec945e7b",
  measurementId: "G-VFLD1ZG29E"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default db.analytics;