import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!username.trim()) {
      tempErrors.username = "Username is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
    if (!email.trim()) {
      tempErrors.email = "Email address is required.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match!";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const registerPayload = {
        username: username,
        email: email,
        password: password
      };

      console.log("Submitting registration profile data:", registerPayload);

      alert("Registration Successful! Please log in.");
      navigate("/login"); 
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        
        <h3 className="text-center mb-4 text-primary fw-bold">Create Account</h3>
        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-secondary">Username:</label>
            <input 
              type="text" 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
              placeholder="Choose a username"
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: "" });
              }} 
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-secondary">Email Address:</label>
            <input 
              type="text" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="name@example.com"
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }} 
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-secondary">Password:</label>
            <input 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Create a password (min 6 chars)"
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }} 
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-4 text-start">
            <label className="form-label fw-semibold text-secondary">Confirm Password:</label>
            <input 
              type="password" 
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
              placeholder="Retype your password"
              value={confirmPassword} 
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
              }} 
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3">
            Register Account
          </button>

          <div className="text-center">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="text-primary fw-bold small text-decoration-none">
              Login Here
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;
