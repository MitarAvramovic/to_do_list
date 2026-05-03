// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";


function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tasks" element={<TaskList/>} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
    </Routes>
  );
}



export default App;
