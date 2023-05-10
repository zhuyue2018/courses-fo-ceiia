import Head from "next/head";
import classes from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <Head>
        <title>Courses of CEIIA</title>
        <meta
          name="description"
          content="Courses of Children's education in impoverished areas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href="/">
            {/* <span>
              <img href="/favicon.ico" />
            </span> */}
            Courses of CEIIA
          </Link>
        </div>
        <nav className={classes.navigation}>
          <div><Link href="/2023/05">Go to courses published in 2023-05</Link></div>
          <div><Link href={{ pathname: "/favourate" }}>My favourates</Link></div>
          <div><Link href={{ pathname: "/history" }}>Learning history</Link></div>
        </nav>
      </header>
    </>
  );
}
