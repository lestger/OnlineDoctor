import React from 'react';
import './Loading.css'
const Loading = ({className,style}) => {

    return (
        <div className={className} style={style}>
            <div  className="loading"></div>
        </div>
    );
};

export default Loading;