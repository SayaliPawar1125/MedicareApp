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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {

        const tempErrors = {};
        let isValid = true;


        // FIRST NAME
        if (!firstname.trim()) {

            tempErrors.firstname = "First Name is required.";
            isValid = false;

        } else if (!/^[A-Za-z ]+$/.test(firstname.trim())) {

            tempErrors.firstname =
                "First Name should contain only letters.";
            isValid = false;

        } else if (
            firstname.trim().length < 2 ||
            firstname.trim().length > 50
        ) {

            tempErrors.firstname =
                "First Name must be between 2 and 50 characters.";
            isValid = false;
        }


        // LAST NAME
        if (!lastname.trim()) {

            tempErrors.lastname = "Last Name is required.";
            isValid = false;

        } else if (!/^[A-Za-z ]+$/.test(lastname.trim())) {

            tempErrors.lastname =
                "Last Name should contain only letters.";
            isValid = false;

        } else if (
            lastname.trim().length < 2 ||
            lastname.trim().length > 50
        ) {

            tempErrors.lastname =
                "Last Name must be between 2 and 50 characters.";
            isValid = false;
        }


        // EMAIL
        if (!email.trim()) {

            tempErrors.email = "Email address is required.";
            isValid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {

            tempErrors.email =
                "Please enter a valid email address.";
            isValid = false;
        }


        // PHONE
        if (!phone.trim()) {

            tempErrors.phone = "Phone number is required.";
            isValid = false;

        } else if (!/^\d{10}$/.test(phone)) {

            tempErrors.phone =
                "Phone number must contain exactly 10 digits.";
            isValid = false;
        }


        // DATE OF BIRTH
        if (!dateOfBirth) {

            tempErrors.dateOfBirth =
                "Date of birth is required.";
            isValid = false;
        }


        // GENDER
        if (!gender) {

            tempErrors.gender =
                "Please select your gender.";
            isValid = false;
        }


        // ADDRESS
        if (!address.trim()) {

            tempErrors.address =
                "Address is required.";
            isValid = false;

        } else if (address.trim().length < 5) {

            tempErrors.address =
                "Address must be at least 5 characters.";
            isValid = false;
        }


        // PASSWORD
        if (!password) {

            tempErrors.password =
                "Password is required.";
            isValid = false;

        } else if (password.length < 4) {

            tempErrors.password =
                "Password must be at least 4 characters.";
            isValid = false;

        } else if (password.length > 20) {

            tempErrors.password =
                "Password must be between 4 and 20 characters.";
            isValid = false;
        }


        // CONFIRM PASSWORD
        if (!confirmPassword) {

            tempErrors.confirmPassword =
                "Please confirm your password.";
            isValid = false;

        } else if (password !== confirmPassword) {

            tempErrors.confirmPassword =
                "Passwords do not match.";
            isValid = false;
        }


        setErrors(tempErrors);

        return isValid;
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


            // IMPORTANT:
            // These names must match RegisterRequest.java

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


            console.log(
                "Registration Payload:",
                registerPayload
            );


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

                console.error(
                    "Registration Status:",
                    response.status
                );

                console.error(
                    "Registration Response:",
                    responseText
                );

                throw new Error(
                    responseText ||
                    `Registration failed (${response.status})`
                );
            }


            alert(
                "Registration successful! Please login."
            );

            navigate("/login");


        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );

            alert(
                error.message ||
                "Registration failed."
            );

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


                <form onSubmit={handleSubmit}>


                    {/* FIRST NAME */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            First Name:
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.firstname
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Enter your first name"
                            value={firstname}
                            onChange={(e) => {

                                setFirstname(e.target.value);

                                if (errors.firstname) {

                                    setErrors({
                                        ...errors,
                                        firstname: ""
                                    });
                                }
                            }}
                        />

                        {errors.firstname && (
                            <div className="invalid-feedback">
                                {errors.firstname}
                            </div>
                        )}

                    </div>


                    {/* LAST NAME */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Last Name:
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.lastname
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Enter your last name"
                            value={lastname}
                            onChange={(e) => {

                                setLastname(e.target.value);

                                if (errors.lastname) {

                                    setErrors({
                                        ...errors,
                                        lastname: ""
                                    });
                                }
                            }}
                        />

                        {errors.lastname && (
                            <div className="invalid-feedback">
                                {errors.lastname}
                            </div>
                        )}

                    </div>


                    {/* EMAIL */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Email Address:
                        </label>

                        <input
                            type="email"
                            className={`form-control ${
                                errors.email
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => {

                                setEmail(e.target.value);

                                if (errors.email) {

                                    setErrors({
                                        ...errors,
                                        email: ""
                                    });
                                }
                            }}
                        />

                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}

                    </div>


                    {/* PHONE */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Phone Number:
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.phone
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="10 digit phone number"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                setPhone(value);

                                if (errors.phone) {

                                    setErrors({
                                        ...errors,
                                        phone: ""
                                    });
                                }
                            }}
                        />

                        {errors.phone && (
                            <div className="invalid-feedback">
                                {errors.phone}
                            </div>
                        )}

                    </div>


                    {/* DATE OF BIRTH */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Date of Birth:
                        </label>

                        <input
                            type="date"
                            className={`form-control ${
                                errors.dateOfBirth
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={dateOfBirth}
                            onChange={(e) => {

                                setDateOfBirth(
                                    e.target.value
                                );

                                if (errors.dateOfBirth) {

                                    setErrors({
                                        ...errors,
                                        dateOfBirth: ""
                                    });
                                }
                            }}
                        />

                        {errors.dateOfBirth && (
                            <div className="invalid-feedback">
                                {errors.dateOfBirth}
                            </div>
                        )}

                    </div>


                    {/* GENDER */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Gender:
                        </label>

                        <select
                            className={`form-select ${
                                errors.gender
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={gender}
                            onChange={(e) => {

                                setGender(e.target.value);

                                if (errors.gender) {

                                    setErrors({
                                        ...errors,
                                        gender: ""
                                    });
                                }
                            }}
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                        {errors.gender && (
                            <div className="invalid-feedback">
                                {errors.gender}
                            </div>
                        )}

                    </div>


                    {/* ADDRESS */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Address:
                        </label>

                        <textarea
                            className={`form-control ${
                                errors.address
                                    ? "is-invalid"
                                    : ""
                            }`}
                            rows="3"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => {

                                setAddress(e.target.value);

                                if (errors.address) {

                                    setErrors({
                                        ...errors,
                                        address: ""
                                    });
                                }
                            }}
                        ></textarea>

                        {errors.address && (
                            <div className="invalid-feedback">
                                {errors.address}
                            </div>
                        )}

                    </div>


                    {/* PASSWORD */}

                    <div className="mb-3 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Password:
                        </label>

                        <input
                            type="password"
                            className={`form-control ${
                                errors.password
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => {

                                setPassword(e.target.value);

                                if (errors.password) {

                                    setErrors({
                                        ...errors,
                                        password: ""
                                    });
                                }
                            }}
                        />

                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="mb-4 text-start">

                        <label className="form-label fw-semibold text-secondary">
                            Confirm Password:
                        </label>

                        <input
                            type="password"
                            className={`form-control ${
                                errors.confirmPassword
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Retype your password"
                            value={confirmPassword}
                            onChange={(e) => {

                                setConfirmPassword(
                                    e.target.value
                                );

                                if (errors.confirmPassword) {

                                    setErrors({
                                        ...errors,
                                        confirmPassword: ""
                                    });
                                }
                            }}
                        />

                        {errors.confirmPassword && (
                            <div className="invalid-feedback">
                                {errors.confirmPassword}
                            </div>
                        )}

                    </div>


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2 mb-3"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register Account"
                        }

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