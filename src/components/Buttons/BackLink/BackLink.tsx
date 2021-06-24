import React from 'react';
import style from './BackLink.module.css';
import {NavLink} from "react-router-dom";

type Props = {
    to: string;
    action?: () => void;
}

const BackLink = ({to, action}: Props) => {
    return (
        <NavLink to={to} className={style.button} onClick={action}>Назад</NavLink>
    );
}

export default BackLink;