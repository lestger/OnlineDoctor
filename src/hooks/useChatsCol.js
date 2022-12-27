import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";


export  const  useChatsCol=  (db, path, user)=>{
    const [data,setData]=useState([])
    useEffect(()=>{

            const usersRef=collection(db,path);
            const  q=query(usersRef,where("chats","array-contains", user));
            onSnapshot(q, (querySnapshot)=>{
                let users = [];
                querySnapshot.forEach((doc)=>{
                    users.push(doc.data());
                });
                setData(users);
            });



    },[])
return data;


    
}