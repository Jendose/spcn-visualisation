import React from 'react';
import style from './Header.module.css';

type Props = {
    text: string;
}

const Header = ({text}: Props) => {
    return (
        <div className={style.header}>{text}</div>
    );
}

export default Header;