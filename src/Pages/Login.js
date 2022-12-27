import React, {useState} from 'react';
import icon from '../images/icon_white.png';
import {Link, useNavigate} from "react-router-dom";
import {auth, db, doc, signInWithEmailAndPassword, updateDoc} from "../FirebaseAPI/Firebase";
import {UpdateDoc} from "../hooks/updateDoc";

const Login = () => {

    const navigate=useNavigate();
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        error:null,
        loading:false
    })
    const {email,password,error,loading}=data
    const handleChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}

    async function submitLoginForm() {
        setData({...data, error: null ,loading:true});
        if (!email || !password ) {
            setData({...data, error: <p className={"alert alert-warning"}>Please, Fill in all the fields!</p>});
        }
        else {
            setData({...data, error: <p className={"alert alert-success"}>Loading...</p>, loading: true});
            try {
                const result =await signInWithEmailAndPassword(auth, email, password);
                await updateDoc(doc(db,'users',result.user.uid),{isOnline:true})
                setData({name:'',email: '',password: '',error: null,loading: false})
                navigate('/');
            }
            catch (err){
                if(err.message==='Firebase: Error (auth/wrong-password).'||err.message==='Firebase: Error (auth/user-not-found).'){setData({...data, error:<p className={"alert alert-warning"}>Firebase: Error (wrong-password or user-not-found)</p>})}
                else {setData({...data, error:<p className={"alert alert-warning"}>{err.message}</p>})}
            }
        }

    }

    return (
        <div className={'box'} style={{ height:'750px'}}>

                <div className="login-container fadeIn" >
                    <h1>Welcome</h1>
                    <img src={icon} alt="Icon"/>
                    <input type="email"
                           id='log-email'
                           className={"submitInput"}
                           onChange={handleChange}
                           name={'email'}
                           value={email}
                           placeholder="Email" required/>
                    <br/><br/>
                    <input type="password" id="log-pass" className={"submitInput"} onChange={handleChange}  name={'password'} value={password} placeholder="Password"/>
                    <button type="submit" onClick={submitLoginForm} id="logbtn" className="log-btn" disabled={loading}>LOGIN</button>

                    <br/><br/>
                    <Link to="/register">
                        <button className="reg-btn">Create account</button>
                    </Link>
                        <div id="err">{error}</div>


                </div>

            </div>
    );
};

export default Login;