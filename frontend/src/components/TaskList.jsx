import { useEffect, useState } from "react";

function getCookie(name){
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
                fetchTasks(); // refresh lista
            })
            .catch((err) => console.error(err));
    };
        return (
        <div>
            <h2>Tasks</h2>

            <form onSubmit={createTask}>
                <input
                    type="text"
                    placeholder="New task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            {tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;