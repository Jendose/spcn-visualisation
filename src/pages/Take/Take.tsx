import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import style from './Take.module.css';
import Button from "../../components/Buttons/Button/Button";
import axios from "axios";
import BigButton from "../../components/Buttons/BigButton/BigButton";
import {useDidUpdateEffect} from "../../utils/hooks/UseDidUpdateEffect";

type Props = {
    activeSpcSet: Array<number>;
    handleTake: (spcId: number, isTake: boolean) => void;
}

const Take = ({activeSpcSet, handleTake}: Props) => {

    const [courseId, setCourseId] = useState<number>();
    const [spcId, setSpcId] = useState<number>();
    const [userId, setUserId] = useState<number>();
    const [isTake, setIsTake] = useState<boolean>(false);

    const requestSpcId = () => {
        return axios.get('http://localhost:8080/courses/' + courseId + '/spc/id');
    }

    const updateSpcId = () => {
        requestSpcId()
            .then(response => setSpcId(response.data))
            .catch(e => {
                console.log(e);
            });
    }

    const updateUserId = () => {
        axios.get('http://localhost:8080/courses/' + courseId + '/user/id')
            .then(response => setUserId(response.data))
            .catch(e => {
                console.log(e);
            });
    }

    const requestStartTake = () => {
        axios.get('http://localhost:8082/courses/' + courseId + '/startTake')
            .then(() => setIsTake(true))
            .catch(e => {
                console.log(e);
            });
    }

    const requestEndTake = () => {
        axios.get('http://localhost:8082/courses/' + courseId + '/endTake')
            .then(() => setIsTake(false))
            .catch(e => {
                console.log(e);
            });
    }

    useDidUpdateEffect(() => {
        requestSpcId().then(response => {
            handleTake(response.data, isTake);
        });
    }, [isTake]);

    useDidUpdateEffect(() => {
        if (courseId){
            requestSpcId()
                .then(response => {
                    const curSpcId = response.data;
                    const spcIsActive = activeSpcSet.includes(curSpcId);
                    if (spcIsActive && !isTake) setIsTake(true);
                    else if (isTake) setIsTake(false);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else if (isTake) setIsTake(false);

    }, [courseId]);

    return (
        <div>
            <Header text={"Управление началом и окончанием приема курса"}/>
            <div className={style.dataContainer}>
                <Input text={"ID курса:"} onInput={value => {
                    setCourseId(value);
                    if (spcId) setSpcId(undefined);
                    if (userId) setUserId(undefined);
                }}/>
                <div className={style.buttons}>
                    <Button text={"Получить ID дозатора"} action={updateSpcId}/>
                    <Button text={"Получить ID пользователя"} action={updateUserId}/>
                </div>
                {spcId ?
                    <div className={style.text}>ID соответствующего курсу дозатора: <b>{spcId}</b></div> :
                    userId ?
                        <div className={style.text}>ID пользователя курса: <b>{userId}</b></div> :
                        <div className={style.text}/>
                }
                {userId && spcId ?
                    <div className={style.text}>ID пользователя курса: <b>{userId}</b></div> :
                    <div className={style.text}/>
                }
            </div>
            <div className={style.bigButton}>
                {!isTake ?
                    <BigButton text={"НАЧАТЬ ПРИЕМ"} action={requestStartTake}/> :
                    <BigButton text={"ЗАВЕРШИТЬ ПРИЕМ"} action={requestEndTake}/>
                }
            </div>
        </div>
    )
}

export default Take;