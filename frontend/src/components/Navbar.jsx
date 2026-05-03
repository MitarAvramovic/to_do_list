import { useNavigate } from "react-router-dom";
import "./Navbar.css";


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

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const csrftoken = getCookie("csrftoken");

        fetch("http://localhost:8000/api-auth/logout/", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrftoken,
            },
        }).then(() => {
            window.location.href = "/register";
        });
    };
    return (
        <div className="navbar">
            <h3 className="logo" onClick={() => navigate("/tasks")}>
                ToDo App
            </h3>

            <div className="nav-buttons">
                <button onClick={() => navigate("/tasks")}> Tasks </button>
                <button onClick={handleLogout}> Logout </button>
            </div>
        </div>
    );
}
export default Navbar;