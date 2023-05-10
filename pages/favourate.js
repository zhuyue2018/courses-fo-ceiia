import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import fs from "fs/promises";
import path from "path";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>请登录后查看您收藏的课程</h1>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  console.info("run when build ");
  // cwd current working directory, 返回的是root地址
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // console.info(data);
  return {
    props: { allCourses: data.allCourses },
  };
}