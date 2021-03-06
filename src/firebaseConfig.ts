// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc,addDoc, setDoc,getDoc,updateDoc,deleteDoc,getDocs, query, orderBy, where } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { extractDate, Toast, ToastOptions } from "./features";



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
        if(path.localeCompare("/register")==0 || path.localeCompare("/")==0)
        {  
            window.location.assign('/home');
        }
    }
    else
    {
        console.log("session not set");

        var path = window.location.pathname;
        if(path.localeCompare("/register")!=0 && path.localeCompare("/")!=0)
        {  
            window.location.assign('/');
        }
    }
    });
}

export async function fetchItems(date:any){
    return new Promise(function(resolve, reject){
        var items = [] as any;
        const auth = getAuth();
        const db = getFirestore();
        issetSession();
    
        onAuthStateChanged(auth, async(user) => {
        const querySnapshot = await getDocs(query(collection(db, "itemlist"),where("user","==",user?.uid),where("datefor","==",date),orderBy('timestamp')));
        querySnapshot.forEach((doc: any) => {
            items.push(doc);
        })
        resolve(items);
    })
});
//console.log(`${doc.id} => ${doc.data().item}`);
}

export async function pushItem(item :string, datefor:number, refresh:any){
    const db = getFirestore();
    const auth = getAuth();
    const docData = {
        item: item,
        timestamp: Date.now(),
        checked: false,
        user: auth.currentUser?.uid,
        datefor: datefor
    }
    //var d = new Date(1382086394000).getDate();            to get date

    await addDoc(collection(db,'itemlist'),docData)
    .then(
        function(){
            refresh();
            Toast("Item added!");
        })
        .catch(
            function(){
                Toast("Some error occured!");
            });
}

export async function setChecked(id:any,res:any, refresh:any){
    const db = getFirestore();

    const docRef = doc(db,'itemlist',id);
    await updateDoc(docRef,{
        checked:res
    }).then(function(){
        refresh();
        if(res)
        {
            Toast('Item checked off.')
        }
        else
        {
            Toast('Item unchecked.');
        }
    });
}

export async function popItem(id:any, refresh:any){
    const db = getFirestore();

    const docRef = doc(db,'itemlist',id);
    await deleteDoc(docRef)
    .then(function(){
        refresh();
        Toast("Item deleted.")
    })
}


export async function updateItem(id:any, value:any, refreshItems:any) {
    const db = getFirestore();
    const docRef = doc(db,'itemlist',id)
    await updateDoc(docRef,{
        item: value,
    }).then(()=>{
        refreshItems();
        Toast("Item updated.")
    })
}

export async function deleteAll(date:any){
    return new Promise(function(resolve, reject){
        const auth = getAuth();
        const db = getFirestore();
        issetSession();
        onAuthStateChanged(auth, async(user) => {
        const querySnapshot = await getDocs(query(collection(db, "itemlist"),where("user","==",user?.uid),where("datefor","==",date)));
        querySnapshot.forEach(async (item: any) => {
            //console.log(await getDoc(item));
            await deleteDoc(item.ref);
        });
        resolve(Toast("Cleared Successfully."))
    });
});
}

export async function checkAll(date:any){
    return new Promise(function(resolve, reject){
        const auth = getAuth();
        const db = getFirestore();
        issetSession();
        onAuthStateChanged(auth, async(user) => {
        const querySnapshot = await getDocs(query(collection(db, "itemlist"),where("user","==",user?.uid),where("datefor","==",date)));
        querySnapshot.forEach(async (item: any) => {
            //console.log(await getDoc(item));
            await updateDoc(item.ref,{checked:true});
        });
        resolve(Toast("All marked."))
    });
});
}

export async function unCheckAll(date:any){
    return new Promise(function(resolve, reject){
        const auth = getAuth();
        const db = getFirestore();
        issetSession();
        onAuthStateChanged(auth, async(user) => {
        const querySnapshot = await getDocs(query(collection(db, "itemlist"),where("user","==",user?.uid),where("datefor","==",date)));
        querySnapshot.forEach(async (item: any) => {
            //console.log(await getDoc(item));
            await updateDoc(item.ref,{checked:false});
        });
        resolve(Toast("All unchecked."))
    });
});
}