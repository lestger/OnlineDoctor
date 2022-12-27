import React, {useEffect, useState} from 'react';
import {auth, collection, db, doc, getDocs, getDownloadURL, ref, storage, updateDoc, uploadBytes} from "../../FirebaseAPI/Firebase";
import {deleteObject} from "firebase/storage";
import ManageUsers from "./ManageUsers";
import Navbar from "../../components/UI/Nav/Navbar";
import Navbottom from "../../components/UI/Nav/Navbottom";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import './style.css'
const Admin = () => {
    const user = useCurrentUser(db,"users");

    const [img,setImg]=useState('');
    useEffect(()=>{
        if(img){
            const uploadImg= async ()=>{
                const imgRef=ref(storage,`avatars/${auth.currentUser.uid}/${new Date().getTime()}-${img.name}`);

                setImg('');
                try{ if(user.photoPath){await deleteObject(ref(storage, user.photoPath));}
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
            <div className="fadeIn profile-div ">

                <h1>Admin panel</h1>
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
                <ManageUsers />
                <hr/>


            </div>
            <Navbottom/>
        </div>
    );
};

export default Admin;