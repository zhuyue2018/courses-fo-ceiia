import Button from "../ui/button";
import { useRef } from "react";
import { useRouter } from "next/router";
export default function HistorySearch() {
  const inputYear = useRef();
  const inputMonth = useRef();
  const router = useRouter();
  function submitHandler(event) {
    event.preventDefault();
    const year = inputYear.current.value;
    const month = inputMonth.current.value;
    // console.info("year:" + year);
    // console.info("month:" + month);
    router.push("/history/" + year + "/" + month);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="year">Year</label>
          <select id="year" ref={inputYear}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div>
          <label htmlFor="month">Month</label>
          <select id="month" ref={inputMonth}>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
          </select>
        </div>
        <Button>search</Button>
      </form>
    </>
  );
}
