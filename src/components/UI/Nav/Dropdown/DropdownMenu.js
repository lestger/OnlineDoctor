import React, {createContext, useContext, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import './style.css'
import Switch from "../../Switch/Switch";
import {useDetectOutsideClick} from "../../../../hooks/useDetectOutsudeClick";
import {Theme} from "../../../../App";
import {ThemeContext} from "../../../context/ThemeContext";

const DropdownMenu = ({user}) => {
    const el=useRef(null);

    const [active, setActive] =useDetectOutsideClick(el,false);


   if(JSON.parse(localStorage.getItem('nightMode'))===null){ localStorage.setItem("nightMode",JSON.stringify(false))}
    const {night,setNight}=useContext(ThemeContext);



    return (
        <div ref={el}>
            <button className={'user-button'} onClick={()=>{setActive(!active)}}>
                <img className={"rounded-circle logo"} src={user.photoUrl}/>
                <span className={`${active?'active':'inactive'}`}><svg
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="white"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                      </svg>
                </span>
            </button>
            <div className={`menu user-label ${active?'active':'inactive'}`}>
                {user.admin ?
                    <li className={`menu-item`} >
                    <Link to={'/admin'} className="btn my-1 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                        </svg>
                        <span>Admin Panel</span></Link></li> : null}
                <li className={`menu-item`}>
                    <Link to={`/profile:${user.ID}`} className="btn  my-1 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>

                        <span>Profile</span>
                    </Link>
                </li>

                <li className={`menu-item`}>

                        <label className={'d-flex  btn my-1 night'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={'sjj'} strokeWidth={1.5}
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                            </svg><span>Dark Mode</span>
                            <Switch active={night} style={{left: 10,
                                top:1}} handleChange={()=>{
                                setNight(!night);
                                localStorage.setItem("nightMode",JSON.stringify(!night));}}/>
                        </label>


                </li>
                <li className={`menu-item`}>
                    <div className=" my-1 btn  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                        </svg>
                        <span>Logout</span></div>
                </li>
            </div>
        </div>
    );
};

export default DropdownMenu;