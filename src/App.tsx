import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TasksPage from "./components/screens/TasksPage";
import BacklogPage from "./components/screens/BacklogPage";
import SprintsPage from "./components/screens/SprintsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-all">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/sprints" element={<SprintsPage />} />
        </Routes>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
    
  );
}

export default App;
