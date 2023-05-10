import Header from "./header";

export default function Layout(props) {
  return (
    <>
      <Header />
      {/* <main className={styles.main}>     */}
        <div>{props.children}</div>
      {/* </main> */}
    </>
  );
}
