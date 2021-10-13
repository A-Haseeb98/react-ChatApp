import { initializeApp, } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {  getFirestore,updateDoc,doc, setDoc, getDoc, getDocs, collection, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVxgoCQJLZikQf5YYRogO3ZXrvKZeH7KY",
    authDomain: "login-signup-aacaf.firebaseapp.com",
    databaseURL: "https://login-signup-aacaf-default-rtdb.firebaseio.com",
    projectId: "login-signup-aacaf",
    storageBucket: "login-signup-aacaf.appspot.com",
    messagingSenderId: "46540882925",
    appId: "1:46540882925:web:3385d9db78eb58694bdde4"
  };
initializeApp(firebaseConfig)

const auth = getAuth();
const db = getFirestore();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    orderBy,
    updateDoc
};