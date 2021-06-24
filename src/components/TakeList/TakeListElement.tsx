import {Take} from "./Take";
import style from "./TakeListElement.module.css";

type Props = {
    take: Take;
    courseId: number;
}

const TakeListElement = (props: Props) => {

    const getDate = () => {
        const hours = new Date(props.take.date).getHours();
        const hoursStr = hours < 10 ? "0"+hours : ""+hours;
        const mins = new Date(props.take.date).getMinutes();
        const minsStr = mins < 10 ? "0"+mins : ""+mins;

        console.log("props.take.status " + props.take.status.toString())

        return new Date(props.take.date).toLocaleDateString() + ", " + hoursStr + ":" + minsStr
    }

    return (
        <div className={style.wrapper}>
            <div className={style.text}>Прием курса {props.courseId} от {getDate()}</div>
            <div className={style.text}>Статус приема: {props.take.status.toString() == 'WAIT' ? "в ожидании завершения" : "завершен"}</div>
            { props.take.status.toString() != 'WAIT' &&
            <div className={style.text}><b>Лекарство {props.take.taken ? "было принято" : "принято не было"}</b></div>
            }
        </div>
    )
}

export default TakeListElement;