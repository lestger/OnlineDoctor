import React, {useContext} from 'react';
import {Navigate,Outlet} from 'react-router-dom'
import {AuthContext} from "./components/context/auth";
const PrivateRoutes = () => {
const {user}=useContext(AuthContext);
    return (
        user ?
            <Outlet/>
            :
            <Navigate to="/"/>
    )

};

export default PrivateRoutes;