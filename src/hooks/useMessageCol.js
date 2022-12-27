import {useEffect, useMemo, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../FirebaseAPI/Firebase";


export const useMessageCol=(collection,user)=>{
const [data,setData]=useState([]);
    useEffect( () => {

        const q = query(collection, orderBy('createdAt', 'asc'));
            onSnapshot(q, async querySnap => {
                let msgs = [];
                await querySnap.forEach(d => {
                    msgs.push(d.data())
                });
                console.log("MSGS FETCHED");
               return  setData(msgs);
            })

    },[user])
    return data;
}