import Link from "next/link";
import classes from "./button.module.css";

export default function Button(props) {
  if (props.href) {
    return (
      <>
        <Link href={props.href} className={classes.btn}>
          {props.children}
        </Link>
      </>
    );
  } else {
    return <button onClick={props.onClick} className={classes.btn}>{props.children}</button>;
  }
}
