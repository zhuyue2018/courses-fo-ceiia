import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { getCoursesById } from '../../../data/dummy-data'
import CoursesList from '../../../components/courses/list'

export default function Home() {
    const router = useRouter();
    const coursesId = router.query.coursesId;
  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>Welcome to courses of id: {coursesId} and lesson id: {router.query.lessonId}</h1>
        </div>
      </main>
    </>
  )
}
