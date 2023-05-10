import CoursesItem from "./items";
import classes from "./list.module.css";
export default function CoursesList(props) {
  const { coursesList } = props;
  // console.info(coursesList);
  return (
    <ul className={classes.list}>
      {coursesList.map(courses => 
        <CoursesItem
          key={courses.id} // why?
          id={courses.id}
          title={courses.title}
          description={courses.description}
          image={courses.image}
          date={courses.date}
        />
      )}
    </ul>
  );
}
