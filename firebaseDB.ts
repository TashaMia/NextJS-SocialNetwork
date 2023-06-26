import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd2kVhP3jCcyljNGgg20qkYUGPJiu9J6w",
  authDomain: "database-83f15.firebaseapp.com",
  projectId: "database-83f15",
  storageBucket: "database-83f15.appspot.com",
  messagingSenderId: "79567359055",
  appId: "1:79567359055:web:4604323287eb19dcd4ae3a",
  measurementId: "G-RXFV499GJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);