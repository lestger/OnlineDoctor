import {useEffect, useState} from "react";

export const useNight=({night})=>{
    const [night,setNight]=useState(JSON.parse(localStorage.getItem('nightMode')))

    useEffect(()=>{
        setNight(!night);
        localStorage.setItem("nightMode",JSON.stringify(!night));
},[night]);
    return night;
}