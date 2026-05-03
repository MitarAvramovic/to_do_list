// src/App.jsx


import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
    </Routes>
  );
}

export default App;
