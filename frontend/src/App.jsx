// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tasks" element={<TaskList/>} />
    </Routes>
  );
}



export default App;
