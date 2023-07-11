import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/Nav/Navbar";
import Navbottom from "../components/UI/Nav/Navbottom";
import {getDoc} from "firebase/firestore";
import {deleteObject} from "firebase/storage"
import {storage,db,doc,auth} from "../FirebaseAPI/Firebase";
import {ref,getDownloadURL,uploadBytes,updateDoc} from "../FirebaseAPI/Firebase"

const Profile = () => {
  const [user,setUser]=useState('');
    const [img,setImg]=useState('');

    useEffect(()=>{

        getDoc(doc(db,'users',auth.currentUser.uid)).then(
             (docSnap)=>{
                if(docSnap.exists){
                    setUser(docSnap.data());
                }
            }
        );
        if(img){
            const uploadImg= async ()=>{
                const imgRef=ref(storage,`avatars/${auth.currentUser.uid}/${new Date().getTime()}-${img.name}`);

                setImg('');

                try{
if(user.photoPath){
    await deleteObject(ref(storage, user.photoPath));}
                    const snap =await uploadBytes(imgRef,img);
                    const url=await  getDownloadURL(ref(storage,snap.ref.fullPath));
                    await updateDoc(doc(db,'users',auth.currentUser.uid),{
                        photoUrl:url,
                        photoPath:snap.ref.fullPath
                    });

                }
                catch (err){console.log(err.message)}

            }
            uploadImg();
        }
    },[img]);


    return (
        <div className={'user-label'}>
            <Navbar/>
            <div className="fadeIn profile-div " style={{height:"100vh"}}>

                <h1>Profile</h1>
                <div className="d-flex align-items-center profile-card  px-2 w-50">

                    <label className="custom-file-upload">
                        <img  className="centering mx-5 my-3" id="profile-pic" alt="Avatar" src={ user.photoUrl}/>
                        <input type="file" onChange={(e)=>{setImg(e.target.files[0])}} id="putImg"/>
                    </label>
                    <div id="prof-name">

                        <h4>{user.username}</h4>

                        <span>{user.email}</span>
                        <p>{user.isOnline ?<>Online</>:<>Offline</>}</p>


                    </div>

                </div>
                <hr/>
            </div>
            <Navbottom/>
            </div>

    );
};

export default Profile;