import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  localStorage.setItem("userId", "1");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("username", username);

    const calculatedRole = username.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    localStorage.setItem("userRole", calculatedRole);

    if (calculatedRole === "ADMIN") {
      alert("Welcome Admin!");
      navigate("/admin-dashboard"); 
    } else {
      alert("Login Successful!");
      navigate("/"); 
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        
        <h3 className="text-center mb-4 text-primary fw-bold">Medicare Login</h3>
        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Username:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Password:</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3">
            Login
          </button>

           <div className="text-center">
          
            <Link to="/forgotpassword" className="text-primary fw-bold small text-decoration-none">
             forgot Password
            </Link>
          </div>

          <div className="text-center">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="text-primary fw-bold small text-decoration-none">
              Register Here
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;
