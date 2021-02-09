import React from 'react';

const Button = (props) => {
    return (
        <>
            <button className={`trivia-time__btn trivia-time__btn--${props.class}`} value={props.value} onClick={props.click} type='button'>
                {props.label.length > 30 ? props.label.substring(0, 25) + "..." : props.label}
                {props.children}
            </button>
        </>
    );
}

export default Button;