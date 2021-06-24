import React from 'react';
import Header from "../../components/Header/Header";
import MainLink from "../../components/Buttons/Link/MainLink";
import BackLink from "../../components/Buttons/BackLink/BackLink";
import style from "./Main.module.css";

type Props = {
    isMainPage: boolean;
    updateIsMainPage: (value: boolean) => void;
}

const Main = ({isMainPage, updateIsMainPage}: Props) => {
    return (
        <div>
            {isMainPage ?
                <div className={style.wrapper}>
                    <Header text={"Демонстрация программного обеспечения сбора данных с дозаторов лекарств"}/>
                    <MainLink to={"/take"} text={"Управление приемом курса"} action={() => updateIsMainPage(false)}/>
                    <MainLink to={"/emulator"} text={"Эмуляция дозатора"} action={() => updateIsMainPage(false)}/>
                    <MainLink to={"/data"} text={"Получение данных"} action={() => updateIsMainPage(false)}/>
                </div> :
                <div>
                    <BackLink to={"/"} action={() => updateIsMainPage(true)}/>
                </div>
            }
        </div>
    )
}

export default Main;