import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./pages/AddTask";
import "./App.css"; // Import CSS for global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">📝 Todo Web </h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
};

