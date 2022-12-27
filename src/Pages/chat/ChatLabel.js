import React from 'react';
import Document from "./document";


const ChatLabel = ({submitMessage,text,setText,setImg,img}) => {

    function  deleteFile(){
        let fileImg=document.getElementById('fileImg');

        fileImg.value='';

        setImg('');
        console.log(img);
    }

    return (

        <div className={'user-label'}>
            {img?<div id={'documentDiv'} className={`p-2`}><button className={'float-end btn btn-secondary'} onClick={deleteFile}>x</button><Document name={img.name}/>
            </div>:null}

            <form className="flex-grow-0 py-3 px-4 border border-bottom-0"  onSubmit={submitMessage}>
                <div className="input-group">

                    <label htmlFor='fileImg'  className="btn btn-primary" style={{ marginRight:"10px", marginTop:"1px", borderRadius:"10px"}} >
                        <input
                            type="file"
                            style={{display:"none"}}
                            id='fileImg'
                            accept={"image/*,video/mp4,video/3gpp,video/quicktime"}
                            onChange={(e)=>{setImg(e.target.files[0]); }}

                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="centering" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </label>
                    <input type="text" value={text} style={{borderRadius:"10px"}} onChange={(e)=>{setText(e.target.value)}}
                           className="form-control" placeholder="Type your message"/>
                    <button className="btn btn-primary ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg></button>
                </div>



            </form>

        </div>
    );
};

export default ChatLabel;