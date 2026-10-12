
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {
        const tempErrors = {};

        // FIRST NAME
        if (!firstname.trim()) {
            tempErrors.firstname = "First name is required.";
        } else if (firstname.trim().length < 2 || firstname.trim().length > 50) {
            tempErrors.firstname = "First name must be between 2 and 50 characters.";
        } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(firstname.trim())) {
            tempErrors.firstname = "Enter a valid name using letters.";
        }

        // LAST NAME
        if (!lastname.trim()) {
            tempErrors.lastname = "Last name is required.";
        } else if (lastname.trim().length < 2 || lastname.trim().length > 50) {
            tempErrors.lastname = "Last name must be between 2 and 50 characters.";
        } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(lastname.trim())) {
            tempErrors.lastname = "Enter a valid name using letters.";
        }

        // EMAIL
        if (!email.trim()) {
            tempErrors.email = "Email address is required.";
        } else if (
            email.trim().length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            tempErrors.email = "Enter a valid email address.";
        }

        // PHONE
        if (!phone) {
            tempErrors.phone = "Phone number is required.";
        } else if (!/^[6-9]\d{9}$/.test(phone)) {
            tempErrors.phone = "Enter a valid 10-digit Indian mobile number.";
        }

        // DATE OF BIRTH
        if (!dateOfBirth) {
            tempErrors.dateOfBirth = "Date of birth is required.";
        } else {
            const selectedDate = new Date(`${dateOfBirth}T00:00:00`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (Number.isNaN(selectedDate.getTime())) {
                tempErrors.dateOfBirth = "Enter a valid date of birth.";
            } else if (selectedDate > today) {
                tempErrors.dateOfBirth = "Date of birth cannot be in the future.";
            } else {
                const ageDate = new Date(selectedDate);
                let age = today.getFullYear() - ageDate.getFullYear();

                const monthDifference = today.getMonth() - ageDate.getMonth();
                if (
                    monthDifference < 0 ||
                    (monthDifference === 0 && today.getDate() < ageDate.getDate())
                ) {
                    age--;
                }

                if (age < 18) {
                    tempErrors.dateOfBirth = "You must be at least 18 years old to register.";
                }
            }
        }

        // GENDER
        if (!gender) {
            tempErrors.gender = "Please select your gender.";
        } else if (!["Female", "Male", "Other"].includes(gender)) {
            tempErrors.gender = "Please select a valid gender.";
        }

        // ADDRESS
        if (!address.trim()) {
            tempErrors.address = "Address is required.";
        } else if (address.trim().length < 5) {
            tempErrors.address = "Address must contain at least 5 characters.";
        } else if (address.trim().length > 250) {
            tempErrors.address = "Address cannot exceed 250 characters.";
        }

        // PASSWORD
        if (!password) {
            tempErrors.password = "Password is required.";
        } else if (password.length < 8 || password.length > 64) {
            tempErrors.password = "Password must be between 8 and 64 characters.";
        } else if (/\s/.test(password)) {
            tempErrors.password = "Password cannot contain spaces.";
        } else if (!/[A-Z]/.test(password)) {
            tempErrors.password = "Include at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            tempErrors.password = "Include at least one lowercase letter.";
        } else if (!/\d/.test(password)) {
            tempErrors.password = "Include at least one number.";
        } else if (!/[^A-Za-z0-9\s]/.test(password)) {
            tempErrors.password = "Include at least one special character, such as @ or #.";
        } else if (
            /^(.)\1+$/.test(password) ||
            ["12345678", "123456789", "password", "password123", "qwerty123", "admin123"].includes(
                password.toLowerCase()
            )
        ) {
            tempErrors.password = "This password is too weak. Choose a stronger password.";
        }

        // CONFIRM PASSWORD
        if (!confirmPassword) {
            tempErrors.confirmPassword = "Please confirm your password.";
        } else if (password !== confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Clear a field's error
    const clearError = (field) => {
        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: ""
        }));
    };

    // =========================
    // REGISTER
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const registerPayload = {
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: password,
                phone: phone,
                dateOfBirth: dateOfBirth,
                gender: gender,
                address: address.trim()
            };

            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(registerPayload)
                }
            );

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || `Registration failed (${response.status}).`
                );
            }

            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // UI
    // =========================

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "80vh",
                paddingTop: "80px",
                paddingBottom: "40px"
            }}
        >
            <div
                className="card p-4 shadow-sm"
                style={{
                    width: "100%",
                    maxWidth: "500px"
                }}
            >
                <h3 className="text-center mb-4 text-primary fw-bold">
                    Create Account
                </h3>

                <form onSubmit={handleSubmit} noValidate>
                    {/* FIRST NAME */}
                    <div className="mb-3 text-start">
                        <label htmlFor="firstname" className="form-label fw-semibold text-secondary">
                            First Name:
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                            placeholder="Enter your first name"
                            value={firstname}
                            maxLength={50}
                            autoComplete="given-name"
                            onChange={(e) => {
                                setFirstname(e.target.value);
                                clearError("firstname");
                            }}
                        />
                        {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                    </div>

                    {/* LAST NAME */}
                    <div className="mb-3 text-start">
                        <label htmlFor="lastname" className="form-label fw-semibold text-secondary">
                            Last Name:
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                            placeholder="Enter your last name"
                            value={lastname}
                            maxLength={50}
                            autoComplete="family-name"
                            onChange={(e) => {
                                setLastname(e.target.value);
                                clearError("lastname");
                            }}
                        />
                        {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                    </div>

                    {/* EMAIL */}
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label fw-semibold text-secondary">
                            Email Address:
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="name@example.com"
                            value={email}
                            maxLength={254}
                            autoComplete="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                clearError("email");
                            }}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* PHONE */}
                    <div className="mb-3 text-start">
                        <label htmlFor="phone" className="form-label fw-semibold text-secondary">
                            Phone Number:
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            placeholder="10-digit mobile number"
                            value={phone}
                            maxLength={10}
                            autoComplete="tel-national"
                            onChange={(e) => {
                                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                                clearError("phone");
                            }}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="mb-3 text-start">
                        <label htmlFor="dateOfBirth" className="form-label fw-semibold text-secondary">
                            Date of Birth:
                        </label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            max={new Date().toLocaleDateString("en-CA")}
                            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
                            value={dateOfBirth}
                            autoComplete="bday"
                            onChange={(e) => {
                                setDateOfBirth(e.target.value);
                                clearError("dateOfBirth");
                            }}
                        />
                        {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                    </div>

                    {/* GENDER */}
                    <div className="mb-3 text-start">
                        <label htmlFor="gender" className="form-label fw-semibold text-secondary">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value);
                                clearError("gender");
                            }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-3 text-start">
                        <label htmlFor="address" className="form-label fw-semibold text-secondary">
                            Address:
                        </label>
                        <textarea
                            id="address"
                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                            rows={3}
                            placeholder="Enter your address"
                            value={address}
                            maxLength={250}
                            autoComplete="street-address"
                            onChange={(e) => {
                                setAddress(e.target.value);
                                clearError("address");
                            }}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label fw-semibold text-secondary">
                            Password:
                        </label>
                        <div className="input-group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Create a strong password"
                                value={password}
                                maxLength={64}
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.password)}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearError("password");
                                    if (confirmPassword) clearError("confirmPassword");
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword((previous) => !previous)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} aria-hidden="true"></i>
                            </button>
                            {errors.password && (
                                <div className="invalid-feedback d-block">{errors.password}</div>
                            )}
                        </div>
                        <small className="text-muted">
                            Use 8–64 characters with uppercase, lowercase, a number and a special character.
                        </small>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-4 text-start">
                        <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary">
                            Confirm Password:
                        </label>
                        <div className="input-group">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                placeholder="Retype your password"
                                value={confirmPassword}
                                maxLength={64}
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.confirmPassword)}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    clearError("confirmPassword");
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowConfirmPassword((previous) => !previous)}
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                title={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`} aria-hidden="true"></i>
                            </button>
                            {errors.confirmPassword && (
                                <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>

                    {/* REGISTER BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register Account"}
                    </button>

                    {/* LOGIN LINK */}
                    <div className="text-center">
                        <span className="text-muted small">
                            Already have an account?{" "}
                        </span>
                        <Link
                            to="/login"
                            className="text-primary fw-bold small text-decoration-none"
                        >
                            Login Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
