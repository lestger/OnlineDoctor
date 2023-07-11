import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from "./Pages/registration/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/chat/Chat";
import Profile from "./Pages/Profile";
import Services from "./Pages/services/Services";
import AuthProvider from "./components/context/auth";
import PrivateRoutes from "./PrivateRoutes";
import React, {useState} from "react";
import Admin from "./Pages/admin/admin";
import ContactUs from "./Pages/ContactUs";
import {LogOut} from "./components/Logout";
import {ThemeContext} from "./components/context/ThemeContext";

function App() {
//TODO: WORK for Optimisation.
// logout on closeTab
// video call with web RTC
// Preloader
//hook useFetching.
    const [night,setNight]=useState(JSON.parse(localStorage.getItem('nightMode'))||true);

    window.addEventListener("beforeunload",  (ev) => {
        ev.preventDefault();

        return ()=> {LogOut()};

    });
    return (<div className={`${night?'nightMode':''}`}>
        <ThemeContext.Provider value={{night, setNight}}>
                <AuthProvider>

                    <BrowserRouter>
                        <Routes>
                            <Route exaxt path='/' element={<Home/>} />
                            <Route  path='/register' element={<Register/>} />
                            <Route  path='*' element={<Navigate to={'/'}/>} />
                            <Route  path='/login' element={<Login/>} />
                            <Route  path='/services' element={<Services/>} />
                            <Route  path='/contact' element={<ContactUs/>} />
                            <Route  path={'/profile:uid'}   element={<Profile  match={''}/>}/>

                            <Route element={<PrivateRoutes/>}>
                                <Route path={'/admin'} element={<Admin/>}/>
                                <Route  path='/chat' element={<Chat/>}  />

                            </Route>


                        </Routes>
                    </BrowserRouter>

                </AuthProvider>
</ThemeContext.Provider>

    </div>



  );
}

export default App;
