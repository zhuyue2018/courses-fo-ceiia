import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

/**
 * 我们可以结合 getStaticProps 和 client-side data fetching,
 * 因为可以保证搜索引擎优化, 可以拿到值
 * 也可以让我们的后续的代码中, 少一点判空
 */
export async function getStaticProps() {
  return fetch("https://domain/comments.json") // 这个是假的地址, 所以这个页面暂时是无法打开的
    .then((res) => res.json())
    .then((data) => {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
          time: data[key].time,
        });
      }
      return { props: { data: transformedData }, validate: 10 };
    });
}

/**
 * 我们想在本页使用客户端渲染的技术来加载课程和课程评论
 * 课程是可以静态加载的,但是评论想要用客户端渲染技术,实时加载
 * 这两种方式如何整合到一个页面下面,还不知道
 *
 * 先做评论的客户端加载
 * 如果使用纯 react, 那应该是用 useEffect + fetch 来做
 *
 */
export default function Home({props}) {
  const router = useRouter();
  const coursesId = router.query.coursesId;
  const [comments, setComments] = useState(props.data);
  // const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR("https://domain/commnents.json");

  /**
   * useEffect 会在整个页面渲染完成后才执行, 所以要做空的判断
   *
   * 可以使用 SWR 替换 ,所有的 react 组件必须直接在 component 里使用,而不能嵌套到方法里面
   * const {data, error} = useSWR("https://domain/commnents.json");
   * 当 data 发生变化时, 重新执行 useEffect
   */
  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
          time: data[key].time,
        });
      }
      setComments(transformedData);
    }
  }, [data]);

  /// 在我们加入 getStaticProps 后, 正常情况下不可能为空了
  // /**
  //  * 我们在浏览器查看源代码的时候,看到的源代码里面其实是这里面的内容(Loading)
  //  */
  if (!data && !comments) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>
            Welcome to courses of id: {coursesId} and lesson id:{" "}
            {router.query.lessonId}
          </h1>
        </div>
        <div>
          <ul>
            {comments.map(comment=>(<li key={comment.id}>{comment.content}</li>))}
          </ul>
        </div>
      </main>
    </>
  );
}
