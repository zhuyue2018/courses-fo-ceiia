import { useRouter } from "next/router";
import { getHistoryByYearAndMonth } from "../../../data/dummy-history";
import HistoryList from "../../../components/history/list";
import ErrorAlert from "../../../components/ui/error-alert";

export default function Home() {
  const router = useRouter();
  const year = +router.query.year;
  const month = +router.query.month;
  if (isNaN(year) || isNaN(month)) {
    return (
      <>
        <ErrorAlert>
          <h1 className="center">illegal year or month</h1>
        </ErrorAlert>
      </>
    );
  }
  if (year && month) {
    const filteredHistories = getHistoryByYearAndMonth(year, month);
    return (
      <>
        {/* <HistoryList historyList={filteredHistories} /> */}
        <div className="center">
          <HistoryList historyList={filteredHistories} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="center">loading</h1>
      </>
    );
  }
}
