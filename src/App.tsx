import React, {useState} from 'react';
import style from './App.module.css';
import {BrowserRouter, Route} from "react-router-dom";
import Take from "./pages/Take/Take";
import Emulator from "./pages/Emulator/Emulator";
import Data from "./pages/Data/Data";
import Main from "./pages/Main/Main";

const App = () => {

    const [isMainPage, updateIsMainPage] = useState<boolean>(window.location.pathname === "/");
    const [activeSpcSet, setActiveSpcSet] = useState<Array<number>>([]);

    const handleTake = (spcId: number, isTake: boolean) => {
        console.log("Активные дозаторы до:\n" + activeSpcSet);
        const newActiveSpcSet = activeSpcSet;
        if (isTake) {
            newActiveSpcSet.push(spcId);
            setActiveSpcSet(newActiveSpcSet);
            console.log("Активные дозаторы после:\n" + newActiveSpcSet);
        }
        else {
            newActiveSpcSet.forEach((element, index) => {
                if (element === spcId) newActiveSpcSet.splice(index);
            });
            setActiveSpcSet(newActiveSpcSet);
            console.log("Активные дозаторы после:\n" + newActiveSpcSet);
        }
    }

    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Main isMainPage={isMainPage} updateIsMainPage={updateIsMainPage}/>
                <Route exact path={"/take"}
                       render={() => <Take activeSpcSet={activeSpcSet} handleTake={(spcId, isTake) => handleTake(spcId, isTake)}/>}
                />
                <Route exact path={"/emulator"}
                       render={() => <Emulator activeSpcSet={activeSpcSet}/>}
                />
                <Route exact path={"/data"}
                       render={() => <Data/>}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
