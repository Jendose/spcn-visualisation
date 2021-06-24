import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import style from "./Emulator.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/Button/Button";
import axios from "axios";
import {useDidUpdateEffect} from "../../utils/hooks/UseDidUpdateEffect";
import BigButton from "../../components/Buttons/BigButton/BigButton";
import opened from '../../images/opened.png';
import openedTake from '../../images/openedTake.png';
import closed from '../../images/closed.png';
import closedTake from '../../images/closedTake.png';


type Props = {
    activeSpcSet: Array<number>;
}

const Emulator = ({activeSpcSet}: Props) => {

    const [spcId, setSpcId] = useState<number>();
    const [spcIp, setSpcIp] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [isTake, setIsTake] = useState<boolean>(false);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useDidUpdateEffect(() => {
        if (spcId) {
            const spcIsActive = !!activeSpcSet.find(id => id == spcId);
            if (spcIsActive && !isTake) setIsTake(true);
            else if (isTake) setIsTake(false);
        }
    }, [spcId]);

    const updateSpcIp = () => {
        axios.get('http://localhost:8080/spc/' + spcId)
            .then(response => {
                const curSpcIp = response.data.ip;
                axios.get(curSpcIp)
                    .then(() => {
                        setMessage("Эмулятор дозатора с серийным номером "
                            + response.data.serialNumber
                            + ", запущен по адресу " + curSpcIp);
                        setSpcIp(curSpcIp);
                    })
                    .catch((e) => {
                        setMessage("Эмулятор дозатора с серийным номером "
                            + response.data.serialNumber
                            + " не запущен");
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    const requestWriteOpening = () => {
        axios.get(spcIp + "/writeOpening")
            .then(() => {
                setIsOpened(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const requestWriteClosing = () => {
        axios.get(spcIp + "/writeClosing")
            .then(() => {
                setIsOpened(false);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <Header text={"Эмуляция дозатора"}/>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <Input text={"ID дозатора:"} onInput={value => {
                        setSpcId(value);
                        if (spcIp) setSpcIp(undefined);
                        if (message) setMessage(undefined);
                    }}/>
                    <Button text={"Подключиться к дозатору"} action={updateSpcIp}/>
                </div>
                {message &&
                <div className={style.text}>{message}</div>
                }
                {spcIp &&
                <div className={style.layout}>
                    <div className={style.spc}>
                        {isTake &&
                        <div className={style.textAbsolute}>Дозатор находится в состоянии записи приема</div>
                        }
                        {isOpened ?
                            isTake ?
                                <img className={style.image} src={openedTake}/> :
                                <img className={style.image} src={opened}/> :
                            isTake ?
                                <img className={style.image} src={closedTake}/> :
                                <img className={style.image} src={closed}/>
                        }
                    </div>
                    <div className={style.bigButtons}>
                        <BigButton text={"ОТКРЫТЬ КРЫШКУ"} action={requestWriteOpening}/>
                        <BigButton text={"ЗАКРЫТЬ КРЫШКУ"} action={requestWriteClosing}/>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Emulator;