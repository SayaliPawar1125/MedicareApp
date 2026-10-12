
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username.trim() || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: username.trim(),
                        password: password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();

            console.log("Login Response:", data);

            // Store the registered user's details returned by Spring Boot
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("firstname", data.firstname);
            localStorage.setItem("lastname", data.lastname);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userRole", data.role);

            console.log(
                "Logged-in user:",
                data.firstname,
                data.lastname
            );

            console.log(
                "Email stored:",
                localStorage.getItem("userEmail")
            );

            console.log(
                "Token stored:",
                localStorage.getItem("token")
            );

            console.log(
                "User ID stored:",
                localStorage.getItem("userId")
            );

            console.log(
                "Role stored:",
                localStorage.getItem("userRole")
            );

            alert("Login Successful!");

            // Navigate according to the role returned by the backend
            if (data.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {

            console.error("Login Error:", error);

            alert(error.message);

        } finally {

            setLoading(false);
        }
    };


    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "80vh",
                paddingTop: "80px"
            }}
        >

            <div
                className="card p-4 shadow-sm"
                style={{
                    width: "100%",
                    maxWidth: "400px"
                }}
            >

                <h3 className="text-center mb-4 text-primary fw-bold">
                    Medicare Login
                </h3>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label fw-semibold text-secondary">
                            Email:
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                    </div>


                    <div className="mb-4">

                        <label className="form-label fw-semibold text-secondary">
                            Password:
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2 mb-3"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>


                    <div className="text-center">

                        <Link
                            to="/forgotpassword"
                            className="text-primary fw-bold small text-decoration-none"
                        >
                            Forgot Password
                        </Link>

                    </div>


                    <div className="text-center">

                        <span className="text-muted small">
                            Don't have an account?{" "}
                        </span>

                        <Link
                            to="/register"
                            className="text-primary fw-bold small text-decoration-none"
                        >
                            Register Here
                        </Link>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default Login;