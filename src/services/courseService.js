//fetch courses from a mock API
// https://68bd57f3227c48698f844908.mockapi.io/courses

export const fetchCourses = async () => {
  console.log("Fetching courses from API...");
  const response = await fetch(
    "https://68bd57f3227c48698f844908.mockapi.io/courses"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await response.json();
  console.log("Courses fetched successfully.");
  return data;
};
