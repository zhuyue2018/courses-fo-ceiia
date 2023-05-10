import Button from "../ui/button";
import classes from "./search.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Search(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  const router = useRouter();
  function submitHandler(event) {
    event.preventDefault();
    const year = yearInputRef.current.value;
    const month = monthInputRef.current.value;
    const redirectUri = `/${year}/${month}`;
    // console.info("redirect uri: " + redirectUri);
    router.push(redirectUri);
  }
  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="year">Year</label>
            <select id="year" ref={yearInputRef}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="month">Month</label>
            <select id="month" ref={monthInputRef}>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
        </div>
        <Button>Find Courses</Button>

        {/* <div>
        <Button onClick="">Find Courses</Button>
        </div> */}
      </form>
    </>
  );
}
