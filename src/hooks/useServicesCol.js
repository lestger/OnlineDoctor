import {useEffect, useState} from "react";
import {collection, db, getDocs} from "../FirebaseAPI/Firebase";

export const useServicesCol=()=>{
    const [services,setServices]=useState([]);
    useEffect(()=>{
        const getServices=async ()=>{
            const servicesColl= await collection(db,"services");
            const dataColl=await getDocs(servicesColl);
            setServices(dataColl.docs.map((service)=>({ ...service.data()})));
        }
        getServices();

    },[])
    return services;
}