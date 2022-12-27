import React, {useEffect, useState} from 'react';
import {arrayUnion, auth, collection, db, doc, updateDoc} from "../../FirebaseAPI/Firebase";
import Navbar from "../../components/UI/Nav/Navbar";
import Navbottom from "../../components/UI/Nav/Navbottom";
import {onSnapshot, query, where} from "firebase/firestore";

import './services.css';




const Services = () => {
    const [filter,setFilter]=useState([]);
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        const usersRef=collection(db,"users");
        const  q=query(usersRef,where("doctor","!=",''));
        const unsub = onSnapshot(q, (querySnapshot)=>{
            let users = [];
            querySnapshot.forEach((doc)=>{
                users.push(doc.data());
            });
            setUsers(users);
            setFilter(users)
        });

        return ()=>unsub();
    },[])

    const [inputData,setInputData]=useState('');

    function searchService(users,inputData) {
        if(inputData===''){return}
        inputData=inputData.toLowerCase();

        inputData=inputData.split(' ');
        const FilterByDoctor=users.filter(user => user.doctor.toLowerCase().includes(...inputData));
        const FilterByEmail=users.filter(user => user.email.toLowerCase().includes(...inputData));
        const FilterByName=users.filter(user => user.username.toLowerCase().includes(...inputData));

        const filtered=[...FilterByDoctor,...FilterByEmail,...FilterByName];

            const filtered_uniq=[...new Set(filtered)];

        setFilter(filtered_uniq);
    }


   async function chooseDoctor(uid) {

       const user1Ref = doc(db, "users", uid);
       const user2Ref = doc(db, "users", auth.currentUser.uid);

       await updateDoc(user1Ref, {chats: arrayUnion(auth.currentUser.uid)});
       await updateDoc(user2Ref, {
           chats: arrayUnion(uid)
       });

    }

    return (
        <>
            <Navbar/>
            <div className=" user-label">

                <h1 className={"centering"}>Services </h1>


                <div >
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="career-search mb-60">

                                <div  className="career-form centering">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-3 my-3">
                                            <div className="input-group rounded " style={{width:"600px"}}>
                                                <input type="search"
                                                       className="form-control rounded"
                                                       placeholder="Search"
                                                       onChange={(e)=>{setInputData(e.target.value)}}
                                                       value={inputData}
                                                />
                                                <button className="input-group-text border-0" id="search-addon" onClick={()=>{searchService(users,inputData)}}> <svg xmlns="http://www.w3.org/2000/svg" style={{width:"20px", height:"20px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <p className="mb-30 ff-montserrat">Total number of Doctors :{filter.length}</p>
                                {(filter.length!==0)?

                                    filter.map((user)=>{

                                        return(
                                            <div className="filter-result" key={user.ID}>
                                                <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div className="job-left my-4 d-md-flex align-items-center flex-wrap">

                                                        <div className="mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                            <img style={{width:"65px",height:"65px",borderRadius: "50%"}} src={user.photoUrl} alt=""/>

                                                        </div>

                                                        <div className="job-content">
                                                            <div style={{position:"relative",top:"20px", left:"25px"}} className={`${user.isOnline?'online':'offline'}`}/>
                                                            <h5 className="text-center text-md-left">{user.username}</h5>

                                                            <ul className="d-flex justify-content-s flex-wrap" >
                                                                <li className="me-2">
                                                                    {user.doctor}<br/>
                                                                    <p className="fs-6">{user.email}</p>

                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="job-right my-4 flex-shrink-0">
                                                        {/*{auth.currentUser.uid === user.ID ? <i>(You)</i>*/}
                                                        <button onClick={()=>{chooseDoctor(user.ID)}} className="btn d-block w-100
                                           d-sm-inline-block btn-light">Choose</button>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                    :<><div className={"centering"}><h5>No results</h5></div></>}

                            </div>

                        </div>
                    </div></div>
                <Navbottom/>
            </div></>

    );
};

export default Services;