import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import Spinner from "./Spinner";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course.id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
          >
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
