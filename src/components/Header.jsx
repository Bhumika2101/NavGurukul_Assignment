import React from "react";
import Logo from "../assets/logo.png"; 
const Header = ({
  onAddStudent,

  onShowCourses,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="h-15 w-15 flex items-center justify-center bg-white rounded-full shadow-md">
    <img
      src={Logo}
      alt="Logo"
      className="h-12 w-12 object-contain"
    />
    </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-left flex-grow ml-4">
          Student Management Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={onAddStudent}
            className="bg-green-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            Add Student
          </button>
          <button
            onClick={onShowCourses}
            className="bg-green-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            Available Courses
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
