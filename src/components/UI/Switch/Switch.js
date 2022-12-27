import React from 'react';
import './style.css'
const Switch = ({ active, handleChange, style }) => {
    return (
        <>
            <input
                checked={active}
                onChange={handleChange}

                id={`switch-checkbox`}
                type="checkbox"
            />
            <label
                className="switch-label"
                htmlFor={`switch-checkbox`}
                style={style}
            >
                <span className={`circle`} />
            </label>
        </>
    );
};

export default Switch;