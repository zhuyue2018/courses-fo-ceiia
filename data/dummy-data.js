const DUMMY_COURSES = [
  {
    id: "Next.js_for_everyone",
    title: "Next.js for everyone",
    image: "https://cdn.auth0.com/blog/next3/logo.png",
    description: "Next.js for everyone is really a wonderful courses",
    date: "2023-04-08",
    author: "Rieux",
    isFeatured: true,
  },
  {
    id: "Poetries_for_everyone",
    title: "Poetries for everyone",
    image: "https://carrillomartha.com/poetry.jpg",
    description: "Poetries for everyone is really a wonderful courses",
    date: "2023-05-08",
    author: "Rieux",
    isFeatured: false,
  },
];

export function getAllCourses() {
  return DUMMY_COURSES;
}

export function getFeaturedCourses() {
  return DUMMY_COURSES.filter((courses) => courses.isFeatured);
}

export function getFilteredCourses(filter) {
  const { year, month } = filter;
  // console.info("filter year and month is " + year + "-" + month);
  const filtered = DUMMY_COURSES.filter((courses) => {
    const date = new Date(courses.date);
    // console.info("getFullYear:" + date.getFullYear());
    // console.info("getMonth:" + date.getMonth());
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
  // console.info("filtered:" + filtered);
  return filtered;
}

export function getCoursesById(id) {
  return DUMMY_COURSES.filter((courses) => courses.id === id);
}
