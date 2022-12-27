import React from 'react';
import {useNavigate} from "react-router-dom";


const Document = ({name,url}) => {

    return (
        <div>

            <svg xmlns="http://www.w3.org/2000/svg" style={{width:25,height:25,margin:"10 10 10 0"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <a href={url?url:null} className={`link-dark ${url?null:"text-decoration-none"}`}>{name}</a>
        </div>
    );
};

export default Document;