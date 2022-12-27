import React from 'react';
import '../styles/modal.css'

const Modalwindow = ({active,setActive,children}) => {

    function setter() {
        setActive(false)
    }

    return (
        <div className={active?'modalwindow active':'modalwindow'} onClick={setter} >
<div className={active?'modalContent active':'modalContent'} onClick={(e)=>{e.stopPropagation()}}>
    {children}
</div>
        </div>
    );
};

export default Modalwindow;