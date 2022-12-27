import React from 'react';
import icon from "../../images/icon_white.png";
import CreateUser from "./createUser";

const Register = () => {

    return (
        <div className={'box'}>
        <div className={"reg-box fadeIn"}>

                <h1>Create account</h1>
                <img src={icon} alt="Icon"/>

            <br/><br/>

            <CreateUser/>
        </div>
        </div>

    );

}
export default Register;
