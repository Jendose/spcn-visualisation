import React from 'react';
import style from './Button.module.css';

type Props = {
    text: string;
    action: () => void;
}

const Button = ({text, action}: Props) => {
    return (
        <div className={style.button} onClick={action}>{text}</div>);
}

export default Button;