import 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase-admin'


const firebaseconfig = {
  apiKey: "AIzaSyAlcPrXPOcQUaCWD-o3aEwLCGbHHhRSdPs",
  authDomain: "tprofile-44280.firebaseapp.com",
  projectId: "tprofile-44280",
  storageBucket: "tprofile-44280.appspot.com",
  messagingSenderId: "1090609968250",
  appId: "1:1090609968250:web:3190e478645c67d6cc37c3",
  measurementId: "${config.measurementId}"
};

var fire = firebase.initializeApp(firebaseconfig);

export default fire