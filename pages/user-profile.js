/**
 * 我们不想把 uid 暴露在 uri 里面
 * 我们想用 authority 相关的信息,比如 cookie
 */

export default function UserProfile(props) {
  return <h1> {props.username} </h1>;
}

/**
 * 每次请求后才会执行
 * 在 server-side 执行
 * 和 getStaticProps 冲突, 只能使用其中之一
 * 对于高度实时的信息, 我们可以使用这个方法来处理
 * 我们执行 npm run build 后可以看到日志显示, 相应页面是 λ 类型
 */
export async function getServerSideProps(context) {
  console.info("run getServerSideProps");

  /**
   * 我们可以拿到 params, req, resp 
   * 可以从 req 里面获取信息,比如 header 里面的信息
   * 可以处理 resp, 比如我们可以增加一个 cookie 等
   */
  const { params, req, res } = context;

  return {
    props: {username: "MAX_001"},
  }
}