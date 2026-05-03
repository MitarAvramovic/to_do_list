import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    
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

    const handleLogin = (e) => {
        e.preventDefault();

        
        if (!username || !password) {
            console.log("Wrong username or password!");
            return;
        }

        console.log("COOKIES:", document.cookie);

        const csrftoken = getCookie("csrftoken");

        fetch("http://localhost:8000/api-auth/login/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": csrftoken,
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        })
            .then((res) => {
                
                if (!res.ok || res.url.includes("login")) {
                    console.log("Login failed");
                    return;
                }

                console.log("Logged in!");
                navigate("/tasks"); // 🔥 REDIRECT SAMO AKO JE OK
            })
            .catch((err) => console.error(err));
    };

    return (
    <div className="container">
        <div className="login-box">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
);
}

export default Login;