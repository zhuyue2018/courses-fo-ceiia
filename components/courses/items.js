import Link from "next/link";
import LinkButton from "../ui/button";
import classes from "./items.module.css";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
export default function CoursesItem(props) {
  const { id, title, image, description, date } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const exploreLink = `/courses/${id}`;
  //   console.info("title" + title);
  return (
    <li id={id} className={classes.item}>
      <img src={image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <LinkButton href={exploreLink}>
            <span>Explore courses</span>
            <span className={classes.icon}><ArrowRightIcon /></span>
          </LinkButton>
        </div>
      </div>
    </li>
  );
}
