// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDO_tQwDnBOz02_mxmxTBajEg5X6bzxytc",
  authDomain: "clone-c4256.firebaseapp.com",
  projectId: "clone-c4256",
  storageBucket: "clone-c4256.appspot.com",
  messagingSenderId: "1043056289495",
  appId: "1:1043056289495:web:2919c547cf6477e7faf292",
  measurementId: "G-HTZW98LVBV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export{firebaseApp,db,auth};