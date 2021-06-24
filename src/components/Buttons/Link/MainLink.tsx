import React from 'react';
import style from './MainLink.module.css';
import {NavLink} from "react-router-dom";

type Props = {
    to: string;
    text: string;
    action?: () => void;
}

const MainLink = ({to, text, action}: Props) => {
    return (
        <div className={style.wrapper}>
            <NavLink to={to} className={style.button} onClick={action}>{text}</NavLink>
        </div>
    );
}

export default MainLink;