import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        fetch("http://localhost:8000/api/accounts/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(async (res) => {
                const data = await res.json();

                if (res.ok) {
                    navigate("/login");
                } else {
                    console.log(data);


                    const errorMessage =
                        data.errors?.username?.[0] ||
                        data.errors?.password?.[0] ||
                        "Registration failed";

                    alert(errorMessage);
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Server error");
            });
    };

    return (
        <div className="register-page">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Register</h2>

                <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>

            <p className="register-link">
                Već imate nalog? <Link to="/login">Login</Link>
            </p>
        </div>
    );

}

export default Register;