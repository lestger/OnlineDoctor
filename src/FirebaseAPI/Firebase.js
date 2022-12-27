import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import {setDoc,doc,updateDoc,getDocs,Timestamp} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage";
import {getDoc} from "firebase/firestore";
import {collection,arrayUnion} from "firebase/firestore";
import { updateEmail, updatePassword} from "firebase/auth"
const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_CONFIG,
    authDomain: "test-1bf11.firebaseapp.com",
    databaseURL: "https://test-1bf11-default-rtdb.firebaseio.com",
    projectId: "test-1bf11",
    storageBucket: "test-1bf11.appspot.com",
    messagingSenderId: "4966319056",
    appId: "1:4966319056:web:8694d7d8971c258b4c6fd5",
    measurementId: "G-MSL8C7HVQK"
};

const app = initializeApp(firebaseConfig);
 const auth= getAuth();
const db = getFirestore(app);
const storage=getStorage(app);
export{auth,getFirestore,db,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut};
export {setDoc,doc,Timestamp,updateDoc,storage,ref,getDownloadURL,uploadBytes,getDoc,collection,getDocs,arrayUnion, updateEmail, updatePassword}
