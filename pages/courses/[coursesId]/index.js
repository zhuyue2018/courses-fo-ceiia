import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { getCoursesById } from "../../../data/dummy-data";
import CoursesList from "../../../components/courses/list";
import CommentList from "../../../components/comment/list";

export default function Home({ comments }) {
  const router = useRouter();
  const coursesId = router.query.coursesId;
  const courses = getCoursesById(coursesId);
  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>Welcome to courses of id: {coursesId}</h1>
        </div>
        <div>
          {/* 后续改为从后端查询课程内容并渲染 */}
          <CoursesList coursesList={courses} />
        </div>
        <h1>this is the comment block</h1>
        <h1>below is comment list</h1>
        <CommentList comments={comments} />
      </main>
    </>
  );
}

/**
 * 只能在 pages 下, 在 components 里面不生效
 * component 里面不能处理数据?
 * @param {*} context
 * @returns
 */
export async function getServerSideProps(context) {
  console.log("getServerSideProps, comments");
  return {
    props: {
      comments: [
        {
          id: "1",
          auther: "Rieux",
          date: "2023-05-12 15:31:12",
          content: "this coureses is great",
        },
        {
          id: "2",
          auther: "Rieux",
          date: "2023-05-12 15:31:12",
          content: "this coureses is great2",
        },
      ],
    },
    // 没有 fallback 参数
  };
}
