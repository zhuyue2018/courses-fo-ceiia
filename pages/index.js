import CoursesList from "../components/courses/list";
import Search from "../components/courses/search";
// import fs from "fs/promises";
import path from "path";
import { getAllCourses } from "../data/dummy-data";

export default function Home(props) {
  return (
    <>
      <div>
        <h1>欢迎来到课程广场</h1>
      </div>
      <Search />
      <CoursesList coursesList={props.allCourses}></CoursesList>
    </>
  );
}

// ----- 换成下面的fs的写法
// 这个方法会在Component Method(上面的Home方法)执行前执行，并把值放进props，以便Home方法可以获取到
// 这个方法的代码不会打包到前段，所以这里面的代码不必担心泄露一下不想暴露的信息，比如后端接口鉴权的参数，credentials等
// 可以在谷歌浏览器的控制台的Sourses tab下面查看，找不到这段代码逻辑的
// 这个方法在正式环境下不会每次都执行，性能有提升
// 这里面的逻辑会在服务端执行，事实上，大部分页面都是在服务端执行啦，component function 也是
// 怎么刷新？
export async function getStaticProps() {
  console.info("run when build ");
  return {
    props: { allCourses: getAllCourses() },
  };
}
// ------ 换成下面的fs的写法

// ------ fs的写法
/**
 * 假如我们需要使用nodejs提供的fs包，来进行文件操作
 * 那么客户端是无法执行的，因为客户端的js无法使用我们项目的文件系统
 * 这种情况下可以在getStaticProps方法里面执行这种代码
 * nextjs非常聪明，看到你的import的内容尽在getStaticProps方法里使用，那么这些import语句也不会被打包到前端
 */
// export async function getStaticProps() {
//   console.info("run when build ");
//   const data = await getData();

//   if (!data) {
//     return {
//       redirect: {destination: '/no-data'}, // 重定向到另一个页面, 比如可以在获取数据失败的时候使用
//     }
//   }

//   if (data.allCourses.length === 0) {
//     return {
//       notFound: true, // 当 data.allCourses.length === 0 时, 可以把这个值设为 true
//     }
//   }

//   return {
//     props: { allCourses: data.allCourses },
//     revalidate: 10, // 这个参数控制 ISR(Increment Static Generation, 控制定期重新构建. 10 代表 10 秒, 在生产环境下, 如果间隔超过了 10 秒后发生了一次请求,会触发 ISR, 如果是 10 秒内连续的请求, 不会触发 ISR), 非必填, 不填时默认不重新构建
//   };
// }
// ------ fs的写法
/**
 * 我们执行npm run build可以看到build的一下信息：
 * λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
   ○  (Static)  automatically rendered as static HTML (uses no initial props)
   ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   我们在日志可以看到，有getStaticProps的页面，标记是 ●
   本页是 / 
   我们也能看到日志：run when build 在 Generating static pages 后面
   没有任何数据的是 ○
   实时的是 λ
   此时我们也可以在 /.next/server 目录下面看到我们build的页面文件
   可以看到此时，getStaticProps已经执行过了，并且已经把数据放到html页面中了
   严格来讲，getStaticProps不仅仅是在server-side执行，而且是在build的时候执行
 */
/**
 * 上述方法是在build的时候的执行的，但是如果我们想要偶尔刷新怎么办呢？
 *
 * 这种做法其实是定期rebuild
 *
 * 另一种方法是useEffect
 */

export async function getData() {
  // cwd current working directory, 返回的是root地址
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

