import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import CoursesList from "../../../components/courses/list";
import { getFilteredCourses } from "../../../data/dummy-data";

export default function Home() {
  const router = useRouter();
  const year = Number(router.query.year)
  const month = Number(router.query.month);
  if (isNaN(year) || isNaN(month)) {
    return (
      <>
        <h1 className="center">illegal year or month</h1>
      </>
    )
  }
  const filteredCourses = getFilteredCourses({
    year: year,
    month: month,
  });
  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>
            Welcome to courses of year: {router.query.year} and month:{" "}
            {router.query.month}
          </h1>
        </div>
        <div>
          <CoursesList coursesList={filteredCourses} />
        </div>
      </main>
    </>
  );
}
