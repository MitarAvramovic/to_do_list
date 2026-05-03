import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
        }
    }
    return cookieValue;
}

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        fetch("http://localhost:8000/api/tasks/", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setTasks(data));
    };
    const createTask = (e) => {
        e.preventDefault();

        const csrftoken = getCookie("csrftoken");

        fetch("http://localhost:8000/api/tasks/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                title: title,
                completed: false,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTitle("");
                fetchTasks(); 
            })
            .catch((err) => console.error(err));
    };
    return (
    <div className="page">
        <div className="task-container">
            <h2>My Tasks</h2>

            <form className="task-form" onSubmit={createTask}>
                <input
                    type="text"
                    placeholder="New task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="task-item"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                >
                    <span
                        className={`task-title ${
                            task.completed ? "completed" : ""
                        }`}
                    >
                        {task.title}
                    </span>

                    <span>
                        {task.completed ? "✅" : ""}
                    </span>
                </div>
            ))}
        </div>
    </div>
);
}

export default TaskList;