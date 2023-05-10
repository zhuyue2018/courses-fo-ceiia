export default function HistoryItem(props) {
  const { id, userId, date, coursesId, lessonId } = props;
  return (
    <>
      <li>
        userId is {userId} and date is {date} and coursesId is {coursesId} and
        lessonId is {lessonId}
      </li>
    </>
  );
}
