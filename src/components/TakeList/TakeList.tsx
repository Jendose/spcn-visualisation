import {Take} from "./Take";
import style from "./TakeList.module.css";
import TakeListElement from "./TakeListElement";

type Props = {
    takeList: Take[];
    courseId: number;
}

const TakeList = (props: Props) => {
    return (
        <div className={style.wrapper}>
            {props.takeList.map(take => (
                <TakeListElement take={take} courseId={props.courseId}/>
            ))}
        </div>
    )
}

export default TakeList;