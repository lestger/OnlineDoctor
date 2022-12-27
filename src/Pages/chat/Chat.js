import React, {useState} from 'react';
import icon from "../../images/icon.svg";
import {auth, db, getDownloadURL, ref, storage, Timestamp, uploadBytes} from "../../FirebaseAPI/Firebase";
import {addDoc, collection} from "firebase/firestore";
import './chat.css';
import AvailableUsers from "./AvailableUsers";
import ChatLabel from "./ChatLabel";
import Message from "../../components/UI/Message/Message";
import {useChatsCol} from "../../hooks/useChatsCol";
import {useMessageCol} from "../../hooks/useMessageCol";
import Navbar from "../../components/UI/Nav/Navbar";

const Chat = () => {
    const users = useChatsCol(db, 'users', auth.currentUser.uid);

    const [interlocutor, setInterlocutor] = useState([]); //selected user for conservation
    const [img, setImg] = useState('');
    const user1 = auth.currentUser.uid;
    const user2 = interlocutor.ID;
    const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`;
    const msgRef = collection(db, "messages", id, 'chat')
    const msg = useMessageCol(msgRef, interlocutor);

    const selectUser = (user) => {
        setInterlocutor(user);
    }


    const [text, setText] = useState('');
    const submitMessage = async e => {
        setText("");
        e.preventDefault();
        const user2 = interlocutor.ID;
        const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`;
        let url;
        if (img) {
            const imgRef = ref(storage, `messages/${id}/${new Date().getTime()}-${img.name}`);
            const snap = await uploadBytes(imgRef, img);
            url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        }

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            sender: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            mediaName: img.name || '',
            mediaUrl: url || '',
            id: id

        });

    }



    return (
        <div>
            <Navbar />


            <div className="user-label chat-container">
                <div className={'users-list-group'}>
                    <div className={'users-list-item'}>


                        {users.map((user) => {
                            return (<AvailableUsers user={user} selectUser={selectUser} key={user.ID}/>)
                        })}

                        <hr className="my-1 centering" style={{width: "50px"}}/>
                    </div>
                </div>
                <div style={{display:"absolute", width:'100%',height:'100%'}}>
                    {interlocutor.length !== 0 ?
                    <>

                            <div className={"interlocutor-data-field"}> {/*interlocutor data*/}
                                <div>
                                    <img src={interlocutor.photoUrl}
                                         className=""
                                         alt=" " style={{width: "40px", height: "40px"}}/>
                                </div>

                                <div>
                                    <strong>{interlocutor.username}</strong>
                                    <div className="text-muted small"><em>{interlocutor.email}</em></div>
                                </div>

                            </div>

                        <div className="chat-messages p-4 " >

                            {msg.length ? msg.map((message, i) =>
                                    <Message msg={message} userid={user1} user2photo={interlocutor.photo} key={i}/>)
                                : null}

                        </div>
                        <ChatLabel submitMessage={submitMessage} text={text} setText={setText}
                                   setImg={setImg} img={img}/></>
                    :
                    <div className={" user-label centering "} style={{height:'89vh'}}>
                        <div><img src={icon}  alt={'icon'}/>
                            <br/>
                            <i>Select a user to start conversation</i></div>


                    </div>}</div>

            </div>
        </div>

    );
};

export default Chat;