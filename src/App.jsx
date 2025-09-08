import React, { useState, useCallback, useMemo } from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import StudentList from "./components/StudentList";
import Modal from "./components/Modal";
import StudentForm from "./components/StudentForm";
import Spinner from "./components/Spinner";
import SortControls from "./components/SearchControl";
import ConfirmationModal from "./components/ConfirmationModal";
import { useCourses } from "./hooks/useCourses";
import { useStudents } from "./hooks/useStudents";
import { useTheme } from "./hooks/useTheme";
import CourseList from "./components/CourseList";

function App() {
  const [theme, toggleTheme] = useTheme();
  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourses();
  const {
    students,
    isProcessing,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteMultipleStudents,
  } = useStudents();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShowCourseModalOpen, setIsShowCourseModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentsToDelete, setStudentsToDelete] = useState(new Set());

  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState(new Set());

  const handleAddStudentClick = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };
  const handleShowCourseClick = () => {
    setIsShowCourseModalOpen(true);
  };

  const handleEditStudent = useCallback((student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingStudent(null);
  };
  const handleCloseCourseModal = () => {
    setIsShowCourseModalOpen(false);
  };

  const handleSaveStudent = async (studentData) => {
    if ("studentId" in studentData) {
      await updateStudent(studentData);
    } else {
      await addStudent(studentData);
    }
    handleCloseFormModal();
  };

  const handleDeleteStudentClick = useCallback((student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
    setStudentsToDelete(new Set());
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete.studentId);
    } else if (studentsToDelete.size > 0) {
      await deleteMultipleStudents(studentsToDelete);
      setSelectedStudentIds(new Set());
    }
    handleCancelDelete();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredAndSortedStudents = useMemo(() => {
    const courseMap = new Map(courses.map((c) => [c.id, c.name]));

    const filtered = students.filter((s) => {
      const courseName = courseMap.get(s.courseId) || "";
      const query = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        courseName.includes(query)
      );
    });

    return [...filtered];
  }, [students, courses, sortConfig, searchQuery]);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <Header
        onAddStudent={handleAddStudentClick}
        onShowCourses={handleShowCourseClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {/* Fixed theme toggle button at bottom right */}
      <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 50 }}>
        <div
          className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-2 flex items-center"
          style={{ minWidth: 120 }}
        >
          <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Change Theme
          </span>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {coursesLoading ? (
          <div className="pt-20">
            <Spinner />
          </div>
        ) : coursesError ? (
          <div className="text-center text-red-500 bg-red-100 dark:bg-red-900 p-4 rounded-lg">
            {coursesError}
          </div>
        ) : (
          <>
            <SortControls
              sortConfig={sortConfig}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <StudentList
              students={filteredAndSortedStudents}
              courses={courses}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudentClick}
              selectedStudentIds={selectedStudentIds}
              isSearchActive={searchQuery.length > 0}
            />
          </>
        )}
      </main>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={editingStudent ? "Edit Student" : "Add New Student"}
      >
        <StudentForm
          studentToEdit={editingStudent}
          courses={courses}
          onSave={handleSaveStudent}
          onCancel={handleCloseFormModal}
          isProcessing={isProcessing}
        />
      </Modal>
      <Modal
        isOpen={isShowCourseModalOpen}
        onClose={handleCloseCourseModal}
        title="Available Courses"
      >
        <CourseList courses={courses} />
      </Modal>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        isProcessing={isProcessing}
      >
        {studentToDelete
          ? `Are you sure you want to delete the student "${studentToDelete?.name}"? This action cannot be undone.`
          : `Are you sure you want to delete the ${studentsToDelete.size} selected students? This action cannot be undone.`}
      </ConfirmationModal>
    </div>
  );
}

export default App;
