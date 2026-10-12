import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    // Email validation
    const validateEmail = (value) => {
        const email = value.trim();

        if (!email) {
            return "Email is required.";
        }

        if (email.length > 254) {
            return "Email must not exceed 254 characters.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return "Please enter a valid email address.";
        }

        return "";
    };

    // Password validation
    const validatePassword = (value) => {
        if (!value) {
            return "Password is required.";
        }

        if (value.length < 8) {
            return "Password must contain at least 8 characters.";
        }

        if (value.length > 128) {
            return "Password must not exceed 128 characters.";
        }

        if (/^(.)\1+$/.test(value)) {
            return "Password cannot contain only repeated characters.";
        }

        const weakPasswords = [
            "123456",
            "1234567",
            "12345678",
            "123456789",
            "password",
            "qwerty",
            "abc123",
            "admin123"
        ];

        if (weakPasswords.includes(value.toLowerCase())) {
            return "This password is too weak. Please choose a stronger password.";
        }

        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter.";
        }

        if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number.";
        }

        if (!/[^A-Za-z0-9]/.test(value)) {
            return "Password must contain at least one special character, such as @, #, or $.";
        }

        return "";
    };

    // Validate the complete form
    const validateForm = () => {
        const newErrors = {
            username: validateEmail(username),
            password: validatePassword(password)
        };

        setErrors(newErrors);

        return !newErrors.username && !newErrors.password;
    };

    // Handle input changes
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        setErrors((previous) => ({
            ...previous,
            username: validateEmail(value)
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        setErrors((previous) => ({
            ...previous,
            password: validatePassword(value)
        }));
    };

    // Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
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

            // Store user details
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

            // Navigate according to the user's role
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

                <form onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div className="mb-3">
                        <label
                            htmlFor="loginEmail"
                            className="form-label fw-semibold text-secondary"
                        >
                            Email:
                        </label>

                        <input
                            id="loginEmail"
                            type="email"
                            className={`form-control ${
                                errors.username ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your email"
                            value={username}
                            onChange={handleEmailChange}
                            onBlur={() =>
                                setErrors((previous) => ({
                                    ...previous,
                                    username: validateEmail(username)
                                }))
                            }
                            maxLength={254}
                            autoComplete="username"
                            aria-invalid={Boolean(errors.username)}
                            aria-describedby={
                                errors.username ? "emailError" : undefined
                            }
                        />

                        {errors.username && (
                            <div
                                id="emailError"
                                className="invalid-feedback"
                            >
                                {errors.username}
                            </div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="loginPassword"
                            className="form-label fw-semibold text-secondary"
                        >
                            Password:
                        </label>

                        <input
                            id="loginPassword"
                            type="password"
                            className={`form-control ${
                                errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() =>
                                setErrors((previous) => ({
                                    ...previous,
                                    password: validatePassword(password)
                                }))
                            }
                            maxLength={128}
                            autoComplete="current-password"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password ? "passwordError" : undefined
                            }
                        />

                        {errors.password && (
                            <div
                                id="passwordError"
                                className="invalid-feedback"
                            >
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* Forgot Password */}
                    <div className="text-center">
                        <Link
                            to="/forgotpassword"
                            className="text-primary fw-bold small text-decoration-none"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    {/* Register */}
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