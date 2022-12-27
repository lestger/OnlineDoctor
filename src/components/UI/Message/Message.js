import React from 'react';
import Document from "../../../Pages/chat/document";

const Message = ({msg, userid}) => {
    function ext(format) {
      let a=format.match(/\.([^.]+)$/)?.[1].toLowerCase();
        return (a==='jpeg'||a==='png'||a==='gif'||a==='bmp'||a==='ico'||a==='apng'||a==='svg'||a==='jpg')?true:false
    }
    return (
        <>

            <div className={`${(msg.sender===userid)?'chat-message-right':'chat-message-left'} mb-1`}>
                <div className={`${ 'chatBlue' } text-break `} style={{borderRadius:"20px" ,margin:"10px"}}>

                    {msg.mediaUrl?<>{(ext(msg.mediaName))?
                        <><img src={msg.mediaUrl} style={{width:300,height:300}}/><br/></>
                        :<><Document name={msg.mediaName} url={msg.mediaUrl}/></>}
                        </>:null}
                    {msg.text}

                    <span className={ `badge fw-light fst-italic badge-pill float-end text-white mt-2 }`} style={{fontSize:"12px" }}>{msg.createdAt.toDate().getHours()}:{msg.createdAt.toDate().getMinutes()}</span>

                </div>
            </div>

        </>

    );
};

export default Message;