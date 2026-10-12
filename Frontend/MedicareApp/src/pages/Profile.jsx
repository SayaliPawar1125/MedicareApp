import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            navigate("/login");
            return;
        }

        fetch(
            `http://localhost:8080/api/user/${userId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
            .then((response) => {

                if (response.status === 401 ||
                    response.status === 403) {

                    throw new Error(
                        "Session expired. Please login again."
                    );
                }

                if (!response.ok) {
                    throw new Error(
                        "Unable to load profile"
                    );
                }

                return response.json();
            })
            .then((data) => {

                console.log("Profile User:", data);

                setUser(data);

            })
            .catch((error) => {

                console.error(
                    "Profile Error:",
                    error
                );

                alert(error.message);

                if (
                    error.message.includes("Session expired")
                ) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("firstname");
                    localStorage.removeItem("lastname");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userRole");

                    navigate("/login");
                }

            })
            .finally(() => {

                setLoading(false);

            });

    }, [navigate]);


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");

        navigate("/login");
    };


    if (loading) {

        return (
            <div className="container mt-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <p className="mt-2">
                    Loading profile...
                </p>

            </div>
        );
    }


    if (!user) {

        return (
            <div className="container mt-5">

                <div className="alert alert-warning">
                    Unable to load profile.
                </div>

            </div>
        );
    }


    return (

        <div className="container mt-5 mb-5">

            <div
                className="card shadow-lg border-0"
                style={{
                    maxWidth: "700px",
                    margin: "auto"
                }}
            >

                <div className="card-header bg-primary text-white text-center py-4">

                    <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "60px" }}
                    ></i>

                    <h2 className="fw-bold mt-2 mb-0">
                        My Profile
                    </h2>

                </div>


                <div className="card-body p-4">

                    <div className="row g-3">

                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                First Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={user.firstname || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Last Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={user.lastname || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={user.email || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Phone
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={user.phone || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={user.dateOfBirth || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Gender
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={user.gender || ""}
                                readOnly
                            />

                        </div>


                        <div className="col-12">

                            <label className="form-label fw-bold">
                                Address
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={user.address || ""}
                                readOnly
                            ></textarea>

                        </div>

                    </div>


                    <div className="text-center mt-4">

                        <button
                            type="button"
                            className="btn btn-danger px-5 py-2 fw-bold"
                            onClick={handleLogout}
                        >

                            <i className="bi bi-box-arrow-right me-2"></i>

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;