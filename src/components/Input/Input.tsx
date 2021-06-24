import React from 'react';
import style from './Input.module.css';

type Props = {
    text: string;
    defaultValue?: string | number;
    onInput: (value: any) => void;
}


const Input = ({text, defaultValue, onInput}: Props) => {

    return (
        <div className={style.wrapper}>
            <div className={style.text}>{text}</div>
            <input className={style.input} defaultValue={defaultValue ?? ""} onInput={e => onInput((e.target as HTMLInputElement).value)}/>
        </div>
    );
}

export default Input;