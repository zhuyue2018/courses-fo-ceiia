export interface History {
  id: string;
  userId: string;
  date: string;
  coursesId: string;
  lessonId: string;
}

const DUMMY_HISTORY: History[] = [
  {
    id: "5",
    userId: "1",
    date: "2023-05-08",
    coursesId: "Next.js_for_everyone",
    lessonId: "2",
  },
  {
    id: "4",
    userId: "1",
    date: "2023-04-08",
    coursesId: "Next.js_for_everyone",
    lessonId: "2",
  },
  {
    id: "3",
    userId: "1",
    date: "2023-03-08",
    coursesId: "Next.js_for_everyone",
    lessonId: "2",
  },
  {
    id: "2",
    userId: "1",
    date: "2023-02-08",
    coursesId: "Next.js_for_everyone",
    lessonId: "2",
  },
  {
    id: "1",
    userId: "1",
    date: "2023-01-08",
    coursesId: "Next.js_for_everyone",
    lessonId: "1",
  },
];

export function getHistoryByUserId(userId: string): History[] {
  return DUMMY_HISTORY.filter((history) => {
    return history.userId === userId;
  });
}

export function getHistoryByYearAndMonth(year: number, month: number) {
  console.info("year:"+year)
  console.info("month:"+month)
  return DUMMY_HISTORY.filter((history)=>{
    const date = new Date(history.date);
    console.info("date.getFullYear():"+date.getFullYear())
    console.info("date.getMonth():"+date.getMonth())
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
}
