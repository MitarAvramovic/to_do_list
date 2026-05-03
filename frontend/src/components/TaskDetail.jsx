import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetail.css";

function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [title, setTitle] = useState("");

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

    useEffect(() => {
        fetch(`http://localhost:8000/api/tasks/${id}/`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setTitle(data.title);
            });
    }, [id]);

    const updateTask = () => {
        fetch(`http://localhost:8000/api/tasks/${id}/`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                title: title,
                completed: task.completed,
            }),
        }).then(() => navigate("/tasks"));
    };

    const deleteTask = () => {
        fetch(`http://localhost:8000/api/tasks/${id}/`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
        }).then(() => navigate("/tasks"));
    };

    const toggleDone = () => {
        fetch(`http://localhost:8000/api/tasks/${id}/`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                title: task.title,
                completed: !task.completed,
            }),
        }).then(() => navigate("/tasks"));
    };

    if (!task) return <p>Loading...</p>;

    return (
    <div className="page">
        <div className="detail-container">
            <h2>Edit Task</h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="buttons">
                <button className="update-btn" onClick={updateTask}>
                    Update
                </button>

                <button className="delete-btn" onClick={deleteTask}>
                    Delete
                </button>

                <button className="toggle-btn" onClick={toggleDone}>
                    {task.completed ? "Mark as Undone" : "Mark as Done"}
                </button>
            </div>
        </div>
    </div>
);

}

export default TaskDetail;