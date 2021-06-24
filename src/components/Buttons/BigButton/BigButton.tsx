import React from 'react';
import style from './BigButton.module.css';

type Props = {
    text: string;
    action: () => void;
}

const BigButton = ({text, action}: Props) => {
    return (
        <div className={style.button} onClick={action}>{text}</div>);
}

export default BigButton;