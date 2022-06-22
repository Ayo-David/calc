import React from 'react';
import './Button.css'

const Button = ({ value, className, onClick }) => {
    return (
        <button value={value} className={className} onClick={onClick}>{value}</button>
    );
    //class={className}
}

export default Button;