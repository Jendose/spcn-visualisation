import React, {useState} from 'react';
import style from "./Data.module.css";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/Button/Button";
import TakeList from "../../components/TakeList/TakeList";
import {Take} from "../../components/TakeList/Take";
import axios from "axios";

const Data = () => {

    const [courseId, setCourseId] = useState<number>();
    const [showTakeList, setShowTakeList] = useState<boolean>();
    const [takeList, setTakeList] = useState<Array<Take>>();

    const requestTakeList = () => {
        axios.get('http://localhost:8083/courses/' + courseId + '/statistics')
            .then(response => {
                setTakeList(response.data); // Работает?
            })
            .catch(e => {
                console.log(e);
            });


        setShowTakeList(true);
    }

    return (
        <div>
            <Header text={"Получение данных"}/>
            <div className={style.wrapper}>
                <div className={style.container1}>
                    <Input text={"ID курса:"} onInput={value => {
                        setCourseId(value);
                        if (showTakeList) setShowTakeList(undefined);
                    }}/>
                    <Button text={"Получить данные приемов курса"} action={requestTakeList}/>
                </div>
                <div className={style.container}>
                    {showTakeList && takeList && courseId &&
                    <TakeList takeList={takeList} courseId={courseId}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Data;