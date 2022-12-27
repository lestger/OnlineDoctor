import {getDoc} from "firebase/firestore";
import {auth, doc} from "../FirebaseAPI/Firebase";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/context/auth";

export const useCurrentUser = (db, path)=>{
    const {user}=useContext(AuthContext);
const  [data,setData]=useState(false);
         useEffect(  () => {
            const fetchUserData= async ()=>{
             if(user){
                 await getDoc(doc(db, path, auth.currentUser.uid)).then(
                 (docSnap) => {
                     return  docSnap.exists ? setData(docSnap.data()) : null;
                 }
             );}
             else {return null}
            }
       fetchUserData();
         },[])
         return data;
    }