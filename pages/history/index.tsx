import { getHistoryByUserId, History } from "@/data/dummy-history";
import HistoryList from "@/components/history/list";
import styles from "@/styles/Home.module.css";
import HistorySearch from "@/components/history/search";

export default function Home() {
  const histories = getHistoryByUserId("1");
  return (
    <>
      <h1 className="center">history here</h1>
      {/* 从globals.css读取，用引号 */}
      <div className={styles.main}>
        <HistorySearch />
        <HistoryList historyList={histories} />
      </div>
    </>
  );
}

