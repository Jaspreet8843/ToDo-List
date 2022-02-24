// Import the functions you need from the SDKs you need
import { IonFab } from "@ionic/react";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { isUndefined } from "util";
import { Toast, ToastOptions } from "./features";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG4N7noFtE3AExikPPsmFnsqozQ2SeRVA",
  authDomain: "todoapp-b245c.firebaseapp.com",
  projectId: "todoapp-b245c",
  storageBucket: "todoapp-b245c.appspot.com",
  messagingSenderId: "67163951027",
  appId: "1:67163951027:web:f90847b3036220fd5c45c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function RegisterUser(email: string, password: string) {
    console.log(email);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        window.location.assign('/home');
        Toast('Successfully Registered!');
    })
    .catch((error)=>{
        console.log(error);
    })
}

export async function LoginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        Toast('Successfully logged in!');
        var usr = auth.currentUser;
        console.log(usr);
        window.location.assign('/home');
    })
    .catch((error)=>{
        Toast('Invalid ID or Password',3000);
    })
}

export async function LogoutUser() {
    const auth = getAuth();
    signOut(auth)
    .then(()=>{
        console.log("logged out");
    })
    .catch((error)=>{
        console.log(error);
    })
}

export function issetSession(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("session set");
        var path = window.location.pathname;
        if(path.localeCompare("/register")==0 || path.localeCompare("/login")==0)
        {  
            window.location.assign('/home');
        }
    }
    else
    {
        console.log("session not set");

        var path = window.location.pathname;
        if(path.localeCompare("/register")!=0 && path.localeCompare("/login")!=0)
        {  
            window.location.assign('/login');
        }
    }
    });
}

