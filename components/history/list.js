import HistoryItem from "./item";
import classes from "./list.module.css";
export default function HistoryList(props) {
  const { historyList } = props;
  return (
    <>
    <div className={classes.main}>
    <ul>
        {historyList.map((history) => (
          <HistoryItem
            key={history.id}
            id={history.id}
            userId={history.userId}
            date={history.date}
            coursesId={history.coursesId}
            lessonId={history.lessonId}
          />
        ))}
      </ul>
    </div>

    </>
  );
}
