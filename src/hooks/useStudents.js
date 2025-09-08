import { useState, useCallback, useEffect } from "react";

const INITIAL_STUDENTS = [
  {
    studentId: "1",
    name: "Bhumi Salunkhe",
    email: "bhumi.rcpit@gmail.com",
    courseId: 4,
    imageUrl: "https://picsum.photos/seed/alice/200",
  },
  {
    studentId: "2",
    name: "Kiran Patil",
    email: "kiran.rcpit@gmail.com",
    courseId: 2,
    imageUrl: "https://picsum.photos/seed/bob/200",
  },
];

const LOCAL_STORAGE_KEY = "students_data";

export const useStudents = () => {
  const [students, setStudents] = useState(() => {
    // NOTE: Lazy Initialization with localStorage
    try {
      const storedStudents = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedStudents) {
        return JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error(
        "Failed to parse students from localStorage. Using default data.",
        error
      );
    }
    return INITIAL_STUDENTS;
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // NOTE: Persisting State with useEffect
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
    } catch (error) {
      console.error("Failed to save students to localStorage.", error);
    }
  }, [students]);

  const addStudent = useCallback(async (student) => {
    setIsProcessing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          ...student,
          studentId: crypto.randomUUID(),
        };
        // This state update will trigger the useEffect above to save data
        setStudents((prev) => [newStudent, ...prev]);
        setIsProcessing(false);
        resolve(newStudent);
      }, 500);
    });
  }, []);

  const updateStudent = useCallback(async (updatedStudent) => {
    setIsProcessing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents((prev) =>
          prev.map((s) =>
            s.studentId === updatedStudent.studentId ? updatedStudent : s
          )
        );
        setIsProcessing(false);
        resolve(updatedStudent);
      }, 500);
    });
  }, []);

  const deleteStudent = useCallback(async (studentId) => {
    setIsProcessing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
        setIsProcessing(false);
        resolve();
      }, 500);
    });
  }, []);

  const deleteMultipleStudents = useCallback(async (studentIds) => {
    setIsProcessing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents((prev) => prev.filter((s) => !studentIds.has(s.studentId)));
        setIsProcessing(false);
        resolve();
      }, 500);
    });
  }, []);

  return {
    students,
    isProcessing,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteMultipleStudents,
  };
};
