import React, {useState} from 'react';
import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
    signInWithEmailAndPassword,
    Timestamp,
    updateDoc,
    updateEmail,
    updatePassword
} from "../../FirebaseAPI/Firebase";
import {deleteDoc} from "firebase/firestore";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {useUsersCol} from "../../hooks/useUsersCol";
import {useServicesCol} from "../../hooks/useServicesCol";

let selectedUser;
const ManageUsers = () => {

    const users=useUsersCol();
    const services=useServicesCol();
    const currentUser=useCurrentUser(db,"users");
    async function updateUser(){
        try {
            const result =await signInWithEmailAndPassword(auth, selectedUser.email, selectedUser.password);
            updateEmail(result.user, data.email).then(() => {
                updatePassword(result.user, data.password).then(() => { alert("User updated!")});
            })
            await updateDoc(doc(db,'users', auth.currentUser.uid),{
                username:data.name,
                email:data.email,
                password:data.password,
                doctor:data.serviceName
            });

            await signInWithEmailAndPassword(auth, currentUser.email, currentUser.password);
            setData({name:'', email:'', password: '', serviceName: ''})
            window.location.reload();
        }
        catch (err){alert(err)}


    }
    async function createUser(){
        try {
            const result =await createUserWithEmailAndPassword(auth, data.email, data.password);
            await setDoc(doc(db,'users',result.user.uid),
                {
                    ID:result.user.uid,
                    username: name,
                    email: email,
                    password: password,
                    photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/1%20(3).png?alt=media&token=1b624b33-3109-46ec-8ce7-444a8a544820',
                    admin: 0,
                    chats: [],
                    doctor: data.serviceName,
                    disabled: false,
                    isOnline: false,
                    createdAt: Timestamp.fromDate(new Date())
                })
            setData({name:'', email:'', password: '', serviceName: ''});
            alert("User Created");
            // await signInWithEmailAndPassword(auth, currentUser.email, currentUser.password);


        }
        catch (err){alert(err)}

    }
    async function disableUser() {

        await updateDoc(doc(db,'users',selectedUser.ID),{
            disabled: !selectedUser.disabled
        });

    }
    async function setAdmin() {
        let t=(selectedUser.admin===1)?0:1;
        await updateDoc(doc(db, 'users', selectedUser.ID), {
            admin: t
        });

    }
    const createService=async () => {
        await setDoc(doc(db,'services',newService),
            {name:newService})
    }
    const setChosenService= () => {
        let selected_option = document.getElementById('services')[document.getElementById('services').selectedIndex].value;
        setData({...data,serviceName:selected_option})
        setNewService(selected_option)

    }
    const deleteService=async () => {
        await deleteDoc(doc(db, "services" ,newService));

    }

    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        serviceName:'',
    });
    const handleChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}
    const {name,email,password,serviceName}=data;

    const [newService, setNewService]=useState('');
    const setUser=(user)=>{
        selectedUser=user;
        setData({name:user.username, email:user.email, password: user.password, serviceName: user.doctor});
    }




    return (
        <div >
            <div style={{display:"flex"}}>
                <div style={{width:"600px",borderRight:"solid 1px", paddingRight:"10px"}} >
                    <h2>Manage Users</h2>
                    <input type="text" className={"submitInput"} id="reg-name" name={'name'} value={name} onChange={handleChange} placeholder="Name"/>
                    <input type="email" className={"submitInput"} id="reg-email" name={'email'} value={email} onChange={handleChange} placeholder="Email"/>
                    <input type="password" className={"submitInput"} id="reg-pass" name={'password'} value={password} onChange={handleChange} placeholder="Password"/>
                    <input type="text" className={"submitInput"}  name={'serviceName'} value={serviceName} onChange={handleChange} placeholder="Name of Service..."/>
                    <button onClick={updateUser} className={"btn btn-outline-success m-2"}>Update</button>
                    <button onClick={createUser} className={"btn btn-outline-primary m-2"}>Create User</button>
                    <button onClick={disableUser} className={"btn btn-outline-danger m-2"}>Disable/Enable User</button>

                    <button onClick={setAdmin} className={"btn btn-outline-warning"}>Give\Remove Admin</button>
                </div>

                <div style={{marginLeft:"20px"}}>
                    <h2>Manage Services</h2>
                    <br/>

                        <select className="form-select" onChange={setChosenService} id="services">
                            <option selected id="options" value=''>Выберите ваше направление:</option>
                            {services.map((service,i)=>{
                                return(<option key={i} id='options' value={service.name}>{service.name}</option>)
                            })}

                        </select><br/>


                    <input type="text" className={"submitInput"} id="reg-name1" name={'serviceInput'} value={newService}
                           onChange={(e)=>{setNewService(e.target.value)}} placeholder="Name of Service..."/>
                    <button className={"btn btn-outline-primary m-2"} onClick={createService}>Create Service</button>
                    <button className={"btn btn-outline-danger m-2"} onClick={deleteService}>Delete Service</button>

                </div>
            </div>
            <div className={"table-responsive"}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index)=>{
                        return(
                            <tr onClick={() => {setUser(user)}} key={user.ID} className={'list-user'}>
                                <th scope="row">{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.admin?<>Yes</>:<>No</>}</td>
                                <td>{user.doctor}</td>
                                <td>{user.disabled ?<b>Disabled</b>:<>{user.isOnline && <span > Online</span>}</>}</td>
                            </tr>)})}

                    </tbody>
                </table>

            </div>



        </div>

    );
};

export default ManageUsers;