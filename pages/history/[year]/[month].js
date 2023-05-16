import { useRouter } from "next/router";
import { getHistoryByYearAndMonth } from "../../../data/dummy-history";
import HistoryList from "../../../components/history/list";
import ErrorAlert from "../../../components/ui/error-alert";

// export default function Home() {
//   const router = useRouter();
//   const year = +router.query.year;
//   const month = +router.query.month;
//   if (isNaN(year) || isNaN(month)) {
//     return (
//       <ErrorAlert>
//         <h1 className="center">illegal year or month</h1>
//       </ErrorAlert>
//     );
//   }
//   if (year && month) {
//     const filteredHistories = getHistoryByYearAndMonth(year, month); // 这里面的内容是没办法预渲染的, 后续移到getStaticProps里面
//     return <HistoryList historyList={filteredHistories} />;
//   } else {
//     return <h1 className="center">loading</h1>;
//   }
// }

/**
 * 动态路由的页面是默认是不会预渲染的
 * 动态路由的页面, 技术上来讲, 其实是有很多个不同的页面(把所有的枚举值遍历一遍)
 * 如果想在本页预渲染, (使用 getStaticProps), 需要特殊处理,
 * getStaticProps方法会在 build 的时候在 server-side 执行,
 * 显然getStaticProps方法执行的时候, Next.js 不知道 path 相关的参数, 因此也不知道需要预渲染多少页面
 * (此时我们访问页面会得到 Error: getStaticPaths is required for dynamic SSG pages and is missing for '/history/[year]/[month]'.)
 * 那么getStaticProps方法怎么执行呢, 所以需要特殊处理
 * 特殊处理的方式就是:getStaticPaths,
 * getStaticPaths方法实际上告诉 Next.js 哪些页面需要预渲染, 这个方法会提示 year 和 month 会有哪些取值
 */
export async function getStaticProps(context) {
  const { params } = context;
  const year = +params.year; // 当然也可以使用 useRouter 来获取参数, 关联到原 useRouter 代码
  const month = +params.month;
    if (isNaN(year) || isNaN(month)) {
      return (
        <ErrorAlert>
          <h1 className="center">illegal year or month</h1>
        </ErrorAlert>
      );
    }
  // console.info("year:"+year)
  // console.info("month:"+month)
  const filteredHistories = getHistoryByYearAndMonth(year, month);
  // console.info("filteredHistories:"+filteredHistories)
    if (!filteredHistories) {
      return {
        redirect: { destination: "/no-data" }, // 重定向到另一个页面, 比如可以在获取数据失败的时候使用
      };
    }

    if (filteredHistories.length === 0) {
      return {
        notFound: true, // 当 data.allCourses.length === 0 时, 可以把这个值设为 true
      };
    }
  return {
    props: {filteredHistories: filteredHistories},
  }
}

export async function getStaticPaths() {
  return{
    paths: [

      /**
       * 这代表. 我们告诉 Next.js, 
       * 页面上 year 的取值有可能会是 2023, month 的取值有可能是 03, 
       * Next.js 就知道按照这个枚举来进行预渲染了
       * ● /history/[year]/[month] 
       *   └ css/30031e4566bb8bdd.css
       *   └ /history/2023/03
       * 同样我们在编译目录下, 也能看到生成的 html 页面(/.next/server/page/history/2023/03.html)
       */
      {params: {year: "2023", month: "03"}},
 
    ],

    /**
     * 如果你有很多页面需要预渲染, 可能使用 {params: {year: "2023", month: "03"}} 的方式进行配置不是一个很好的方式
     * 一方面需要 hardcode 很多代码
     * 另一方面, 预渲染也会变得很冗长
     * 特别是有很多页面, 加载的概率很小, 我们需要考虑, 是不是有必要对这些页面进行预渲染, 还是说只需要进行实时渲染(这个技术的具体使用后面我们会学到)
     * 
     * false: 对于未配置的页面, 无法访问, 会跳转到 404
     * true: 对于未配置的页面, 可以访问, 会发生实时的渲染
     * blocking: 通过这种方式, 我们甚至可以省略后面的 if (!props.filteredHistories) 检查, 页面会阻塞直到获取filteredHistories 值
     * 注意 blocking 需要 打引号
     * 
     * 通过这种方式, 我们可以选择热门的页面进行预渲染, 非热门的页面进行实时渲染, 达到一个综合的平衡
     */
    fallback: "blocking"
  }
}

export default function Home(props) {

  /**
   * 当我们直接在浏览器输入 http://localhost:3000/history/2023/04时, 
   * filteredHistories会为 undefine, 导致页面报错, 
   * (通过按钮点击进来则不会发生, 因为在http://localhost:3000/history页, 会提前渲染http://localhost:3000/history/2023/04页)
   * 因为实时渲染到导致第一时间,还不能获取到 filteredHistories 值
   * 当获取到filteredHistories, 该页面会重新渲染, 那时候会跳过这个 if block
   */
  if (!props.filteredHistories) {
    console.info("Loading")
    return <h1>Loading</h1>
  }

  return <HistoryList historyList={props.filteredHistories} />;
}
