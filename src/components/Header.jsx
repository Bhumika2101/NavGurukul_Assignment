import React, { useState } from "react";
import Logo from "../assets/logo.png"; 
const Header = ({ onAddStudent, onShowCourses }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
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
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-4 top-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 w-40 z-50">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAddStudent();
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Add Student
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onShowCourses();
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Available Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;