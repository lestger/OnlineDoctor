import React from 'react';
import {Link} from "react-router-dom";
import {db} from "../../../FirebaseAPI/Firebase";
import logo from '../../../images/icon.svg';
import {useCurrentUser} from "../../../hooks/useCurrentUser";
import './style.css';
import DropdownMenu from "./Dropdown/DropdownMenu";





const Navbar = () => {
    const currentUser=useCurrentUser(db,'users');

    return (
        <div>

<nav className="navbar navbar-expand-lg navbar-light ">
        <Link to={'/'}><img src={logo}  alt=''/></Link>
        <button className="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mx-4">
                        <li className="nav-item">
                            <Link className="under-line text-white nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="under-line text-white nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item"><Link className="under-line text-white nav-link" to="/contact">Contact
                            Us</Link></li>
            {currentUser ?
              <>
                  <li className="nav-item" id="profile">
                      <Link  to="/chat" className="under-line text-white nav-link">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  stroke="currentColor" style={{width:30,height:30}}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                      </Link>
                  </li>

                <div className="nav-item " >
                    <DropdownMenu user={currentUser}/>

                </div>

              </>
                :
              <>
                  <li className="nav-item">
                    <Link className=" text-white nav-link under-line" to="/login">Login</Link>
                </li>
              </>}



                    </ul>
    </div>

            </nav>
        </div>
   
    );
};

export default Navbar;