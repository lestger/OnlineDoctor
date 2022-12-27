import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {auth, createUserWithEmailAndPassword, db, doc, setDoc, Timestamp} from "../../FirebaseAPI/Firebase";

const CreateUser = () => {
    const navigate=useNavigate();
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        error:null,
        loading:false
    })
    const {name,email,password,error,loading}=data
    const handleChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}


    function showService(){
        let options_div=document.getElementById('options_div');
        if(options_div.style.display===''){

            options_div.style.display='block';
        }else{
            options_div.style.display='';
        }

    }
    async function submitRegForm() {
        let selected_option = document.getElementById('services')[document.getElementById('services').selectedIndex].value;
        setData({...data, error: null ,loading:true});

        if (!name || !email || !password ) {
            if(document.getElementById('options_div').style.display==='block' && selected_option ===''){setData({...data, error: <p className={"alert alert-warning"}>Please, Fill in all the fields!</p>});
            }

        }
        else {
            setData({...data, error: <p className={"alert alert-success"}>User created!</p>, loading: true});
            try {
                const result =await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db,'users',result.user.uid),
                    {
                        ID:result.user.uid,
                        username: name,
                        email: email,
                        password:password,
                        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/1%20(3).png?alt=media&token=1b624b33-3109-46ec-8ce7-444a8a544820',
                        admin:0,
                        chats:[],
                        doctor:selected_option,
                        disabled:false,
                        isOnline:true,
                        createdAt:Timestamp.fromDate(new Date())
                    })
                setData({name:'',email: '',password: '',error: null,loading: false})
                navigate('/login');
            }
            catch (err){setData({...data, error:<p className={"alert alert-warning"}>{err.message}</p>})
            }
        }

    }
    return (
        <div>
            <input type="text" className={"submitInput"} id="reg-name" name={'name'} value={name} onChange={handleChange} placeholder="Name"/><br/><br/>
            <input type="email" className={"submitInput"} id="reg-email" name={'email'} value={email} onChange={handleChange} placeholder="Email"/><br/><br/>
            <input type="password" className={"submitInput"} id="reg-pass" name={'password'} value={password} onChange={handleChange} placeholder="Password"/><br/><br/>

            <div id="options_div">
                <select className="form-select" aria-label="Default select example" id="services">
                    <option selected id="options" value=''>Выберите ваше направление:</option>
                    <option id='options' value='Стоматолог'>Стоматолог</option>
                    <option id='options' value='Хирург'>Хирург</option>
                    <option id='options' value='Дерматолог'>Дерматолог</option>
                    <option id='options' value='Энодокринолог'>Энодокринолог</option>
                </select><br/>
            </div>
            <label><input onClick={showService} type="checkbox" id="doctorcheck" value="value"/>As a Doctor</label><br/><br/>
            <button className="reg-btn " type="submit" onClick={submitRegForm} disabled={loading} id="btn">Create</button><br/><br/>
            <div>{error}</div>
        </div>
    );
};

export default CreateUser;