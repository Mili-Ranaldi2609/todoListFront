import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-800 shadow p-4">
      <div className="flex gap-4">
        <Link
          to="/"
          className={`${
            location.pathname === "/" ? "font-bold" : ""
          } hover:underline`}
        >
          Tareas
        </Link>
        <Link
          to="/backlog"
          className={`${
            location.pathname === "/backlog" ? "font-bold" : ""
          } hover:underline`}
        >
          Backlog
        </Link>
        <Link
          to="/sprints"
          className={`${
            location.pathname === "/sprints" ? "font-bold" : ""
          } hover:underline`}
        >
          Sprints
        </Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
