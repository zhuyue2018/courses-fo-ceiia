import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { getCoursesById } from '../../../data/dummy-data'
import CoursesList from '../../../components/courses/list'


export default function Home() {
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
      </main>
    </>
  )
}

