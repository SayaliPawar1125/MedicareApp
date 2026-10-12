import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentService from "../services/AppointmentService";
import api from "../services/api";

function AddAppointment() {
    const location = useLocation();
    const navigate = useNavigate();

    // SELECTED DOCTOR
    const selectedDoctor = location.state || {};

    const doctorId = selectedDoctor.doctorId || 1;
    const doctorName = selectedDoctor.doctorName || "Selected Doctor";
    const doctorSpecialization =
        selectedDoctor.doctorSpecialization || "Specialist";
    const doctorExperience = selectedDoctor.doctorExperience || 0;
    const doctorFees = selectedDoctor.doctorFees || 500;

    // LOGGED-IN USER
    const userId = localStorage.getItem("userId");

    // USER DETAILS
    const [userDetails, setUserDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: ""
    });

    const [loadingUser, setLoadingUser] = useState(false);

    // MYSELF / FAMILY
    const [bookingForSelf, setBookingForSelf] = useState(true);

    // APPOINTMENT DATA
    const [data, setData] = useState({
        appointmentdate: "",
        timeslot: "",
        reason: "",
        status: "BOOKED",
        paymentstatus: "PENDING",
        paymentmode: "PAY_LATER",
        billamount: doctorFees,
        bloodgroup: ""
    });

    // FAMILY MEMBER / PATIENT
    const [patientDetails, setPatientDetails] = useState({
        firstname: "",
        lastname: "",
        gender: "Female",
        dateofbirth: "",
        phone: "",
        email: "",
        address: "",
        bloodgroup: ""
    });

    // ERRORS
    const [errors, setErrors] = useState({});

    // TIME SLOTS
    const timeSlots = [
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM"
    ];

    // BLOOD GROUPS
    const bloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ];

    // LOAD LOGGED-IN USER
    useEffect(() => {
        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        loadUserDetails();
    }, [userId, navigate]);

    // GET USER DETAILS
    const loadUserDetails = async () => {
        try {
            setLoadingUser(true);

            const response = await api.get(`/api/user/${userId}`);
            const user = response.data;

            console.log("Logged-in User:", user);

            setUserDetails({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                phone: user.phone || "",
                dateOfBirth: user.dateOfBirth || "",
                gender: user.gender || "",
                address: user.address || ""
            });
        } catch (error) {
            console.error("Error loading user details:", error);

            setUserDetails({
                firstname: localStorage.getItem("firstname") || "",
                lastname: localStorage.getItem("lastname") || "",
                email: localStorage.getItem("userEmail") || "",
                phone: "",
                dateOfBirth: "",
                gender: "",
                address: ""
            });
        } finally {
            setLoadingUser(false);
        }
    };

    // CHANGE APPOINTMENT DATA
    const changeData = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    // CHANGE PATIENT DATA
    const changePatientData = (e) => {
        const { name, value } = e.target;

        setPatientDetails((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    // SELECT TIME SLOT
    const selectTimeSlot = (slot) => {
        setData((prev) => ({
            ...prev,
            timeslot: slot
        }));

        setErrors((prev) => ({
            ...prev,
            timeslot: ""
        }));
    };

    // VALIDATION
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!data.appointmentdate) {
            tempErrors.appointmentdate =
                "Appointment date is required.";
            isValid = false;
        }

        if (!data.timeslot) {
            tempErrors.timeslot =
                "Please select a time slot.";
            isValid = false;
        }

        if (!data.reason.trim()) {
            tempErrors.reason =
                "Reason for appointment is required.";
            isValid = false;
        }

        // MYSELF
        if (bookingForSelf) {
            if (!data.bloodgroup) {
                tempErrors.bloodgroup =
                    "Please select your blood group.";
                isValid = false;
            }
        }

        // FAMILY MEMBER
        if (!bookingForSelf) {
            if (!patientDetails.firstname.trim()) {
                tempErrors.firstname =
                    "First name is required.";
                isValid = false;
            }

            if (!patientDetails.lastname.trim()) {
                tempErrors.lastname =
                    "Last name is required.";
                isValid = false;
            }

            if (!patientDetails.dateofbirth) {
                tempErrors.dateofbirth =
                    "Date of birth is required.";
                isValid = false;
            }

            if (!patientDetails.address.trim()) {
                tempErrors.address =
                    "Address is required.";
                isValid = false;
            }

            if (!patientDetails.bloodgroup) {
                tempErrors.patientBloodgroup =
                    "Blood group is required.";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    // SAVE APPOINTMENT
    const saveAppointment = async () => {
        if (!validateForm()) {
            return;
        }

        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        try {
            let patient = null;

            // FAMILY MEMBER
            if (!bookingForSelf) {
                const patientPayload = {
                    firstname: patientDetails.firstname,
                    lastname: patientDetails.lastname,
                    gender: patientDetails.gender,
                    dateofbirth: patientDetails.dateofbirth,
                    phone: patientDetails.phone,
                    email: patientDetails.email,
                    address: patientDetails.address,
                    bloodgroup: patientDetails.bloodgroup,
                    registrationdate: new Date().toISOString()
                };

                console.log(
                    "Patient Payload:",
                    patientPayload
                );

                // SAVE PATIENT
                const patientResponse = await api.post(
                    `/api/v1/savePatient/${userId}`,
                    patientPayload
                );

                console.log(
                    "Patient Response:",
                    patientResponse.data
                );

                patient = patientResponse.data;
            }

            // APPOINTMENT PAYLOAD
            const finalPayload = {
                appointmentdate: data.appointmentdate,
                timeslot: data.timeslot,
                reason: data.reason,
                status: "BOOKED",
                paymentstatus: "PENDING",
                paymentmode: "PAY_LATER",
                billamount: Number(doctorFees),

                user: {
                    id: Number(userId)
                },

                doctor: {
                    id: Number(doctorId)
                },

                patient: patient
                    ? {
                        id: patient.id
                    }
                    : null
            };

            console.log(
                "Appointment Payload:",
                finalPayload
            );

            // SAVE APPOINTMENT
            const response =
                await AppointmentService.saveAppointment(
                    finalPayload
                );

            console.log(
                "Appointment Response:",
                response.data
            );

            alert(
                "Appointment booked successfully!"
            );

            navigate("/appointments");

        } catch (error) {
            console.error(
                "Appointment booking failed:",
                error
            );

            console.error(
                "Backend Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to book appointment."
            );
        }
    };

    // TODAY DATE
    const today = new Date()
        .toISOString()
        .split("T")[0];

    return (
        <div className="container mt-5 mb-5">
            <div
                className="card p-4 shadow-sm mx-auto"
                style={{ maxWidth: "700px" }}
            >
                <h2 className="mb-4 text-center text-primary fw-bold">
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Appointment
                </h2>

                {/* DOCTOR DETAILS */}
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Doctor
                    </label>

                    <div className="border rounded-3 p-3 bg-light">
                        <div className="d-flex align-items-center">
                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                style={{
                                    width: "55px",
                                    height: "55px"
                                }}
                            >
                                <i className="bi bi-person-badge fs-3"></i>
                            </div>

                            <div>
                                <h5 className="mb-1 fw-bold">
                                    {doctorName}
                                </h5>

                                <div className="text-secondary">
                                    {doctorSpecialization}
                                </div>

                                <small className="text-muted">
                                    Experience:{" "}
                                    {doctorExperience} Years
                                </small>
                            </div>
                        </div>

                        <hr />

                        <div className="fw-bold text-success">
                            ₹{Number(doctorFees).toFixed(2)}
                        </div>

                        <small className="text-muted">
                            Consultation Fee
                        </small>
                    </div>
                </div>

                {/* SELECT PATIENT */}
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Select Patient
                    </label>

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className={`btn w-50 ${
                                bookingForSelf
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            }`}
                            onClick={() =>
                                setBookingForSelf(true)
                            }
                        >
                            <i className="bi bi-person me-2"></i>
                            Myself
                        </button>

                        <button
                            type="button"
                            className={`btn w-50 ${
                                !bookingForSelf
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            }`}
                            onClick={() =>
                                setBookingForSelf(false)
                            }
                        >
                            <i className="bi bi-people me-2"></i>
                            Family Member
                        </button>
                    </div>
                </div>

                {/* MYSELF */}
                {bookingForSelf && (
                    <div className="border rounded-3 p-3 bg-light mb-4">
                        <h5 className="fw-bold mb-3 text-primary">
                            <i className="bi bi-person-circle me-2"></i>
                            Your Details
                        </h5>

                        <p className="text-muted small mb-3">
                            These details are taken from your
                            registration account.
                        </p>

                        {loadingUser ? (
                            <div className="text-center py-3">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="mt-2 text-muted">
                                    Loading your details...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control bg-white"
                                            value={
                                                userDetails.firstname
                                            }
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control bg-white"
                                            value={
                                                userDetails.lastname
                                            }
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control bg-white"
                                        value={userDetails.email}
                                        readOnly
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control bg-white"
                                            value={userDetails.phone}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Date of Birth
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control bg-white"
                                            value={
                                                userDetails.dateOfBirth
                                            }
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Gender
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control bg-white"
                                        value={userDetails.gender}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control bg-white"
                                        rows="2"
                                        value={userDetails.address}
                                        readOnly
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* FAMILY MEMBER */}
                {!bookingForSelf && (
                    <div className="border rounded-3 p-3 bg-light mb-4">
                        <h5 className="fw-bold mb-3 text-primary">
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Family Member Details
                        </h5>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstname"
                                    className={`form-control ${
                                        errors.firstname
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter first name"
                                    value={
                                        patientDetails.firstname
                                    }
                                    onChange={
                                        changePatientData
                                    }
                                />

                                {errors.firstname && (
                                    <div className="invalid-feedback">
                                        {errors.firstname}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastname"
                                    className={`form-control ${
                                        errors.lastname
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter last name"
                                    value={
                                        patientDetails.lastname
                                    }
                                    onChange={
                                        changePatientData
                                    }
                                />

                                {errors.lastname && (
                                    <div className="invalid-feedback">
                                        {errors.lastname}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={
                                        patientDetails.gender
                                    }
                                    onChange={
                                        changePatientData
                                    }
                                >
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
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="dateofbirth"
                                    className={`form-control ${
                                        errors.dateofbirth
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    value={
                                        patientDetails.dateofbirth
                                    }
                                    onChange={
                                        changePatientData
                                    }
                                />

                                {errors.dateofbirth && (
                                    <div className="invalid-feedback">
                                        {errors.dateofbirth}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Blood Group
                            </label>

                            <select
                                name="bloodgroup"
                                className={`form-select ${
                                    errors.patientBloodgroup
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={
                                    patientDetails.bloodgroup
                                }
                                onChange={
                                    changePatientData
                                }
                            >
                                <option value="">
                                    Select Blood Group
                                </option>

                                {bloodGroups.map((group) => (
                                    <option
                                        key={group}
                                        value={group}
                                    >
                                        {group}
                                    </option>
                                ))}
                            </select>

                            {errors.patientBloodgroup && (
                                <div className="invalid-feedback">
                                    {errors.patientBloodgroup}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="10 digit phone number"
                                maxLength="10"
                                value={patientDetails.phone}
                                onChange={(e) => {
                                    setPatientDetails((prev) => ({
                                        ...prev,
                                        phone: e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    }));
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                value={patientDetails.email}
                                onChange={changePatientData}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Address
                            </label>

                            <textarea
                                name="address"
                                rows="2"
                                className={`form-control ${
                                    errors.address
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Enter address"
                                value={patientDetails.address}
                                onChange={changePatientData}
                            />

                            {errors.address && (
                                <div className="invalid-feedback">
                                    {errors.address}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* BLOOD GROUP - MYSELF */}
                {bookingForSelf && (
                    <div className="mb-4">
                        <label className="form-label fw-bold">
                            Blood Group
                        </label>

                        <select
                            name="bloodgroup"
                            className={`form-select ${
                                errors.bloodgroup
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={data.bloodgroup}
                            onChange={changeData}
                        >
                            <option value="">
                                Select Blood Group
                            </option>

                            {bloodGroups.map((group) => (
                                <option
                                    key={group}
                                    value={group}
                                >
                                    {group}
                                </option>
                            ))}
                        </select>

                        {errors.bloodgroup && (
                            <div className="invalid-feedback">
                                {errors.bloodgroup}
                            </div>
                        )}
                    </div>
                )}

                {/* APPOINTMENT DATE */}
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        name="appointmentdate"
                        className={`form-control ${
                            errors.appointmentdate
                                ? "is-invalid"
                                : ""
                        }`}
                        value={data.appointmentdate}
                        onChange={changeData}
                        min={today}
                    />

                    {errors.appointmentdate && (
                        <div className="invalid-feedback">
                            {errors.appointmentdate}
                        </div>
                    )}
                </div>

                {/* TIME SLOTS */}
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Select Time Slot
                    </label>

                    <div className="row g-2">
                        {timeSlots.map((slot) => (
                            <div
                                className="col-6 col-md-4"
                                key={slot}
                            >
                                <button
                                    type="button"
                                    className={`btn w-100 ${
                                        data.timeslot === slot
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={() =>
                                        selectTimeSlot(slot)
                                    }
                                >
                                    {slot}
                                </button>
                            </div>
                        ))}
                    </div>

                    {errors.timeslot && (
                        <div className="text-danger small mt-2">
                            {errors.timeslot}
                        </div>
                    )}
                </div>

                {/* REASON */}
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Reason for Visit
                    </label>

                    <textarea
                        name="reason"
                        rows="3"
                        className={`form-control ${
                            errors.reason
                                ? "is-invalid"
                                : ""
                        }`}
                        placeholder="Enter your reason or symptoms..."
                        value={data.reason}
                        onChange={changeData}
                    />

                    {errors.reason && (
                        <div className="invalid-feedback">
                            {errors.reason}
                        </div>
                    )}
                </div>

                {/* PAYMENT */}
                <div className="border-top pt-3 mb-3">
                    <div className="d-flex justify-content-between mb-2">
                        <span className="fw-semibold">
                            Consultation Fee
                        </span>

                        <span className="fw-bold text-success">
                            ₹{Number(doctorFees).toFixed(2)}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <span className="fw-semibold">
                            Payment Mode
                        </span>

                        <span className="badge bg-light text-dark border">
                            Pay Later
                        </span>
                    </div>
                </div>

                {/* CONFIRM BUTTON */}
                <button
                    type="button"
                    className="btn btn-primary w-100 fw-bold py-2"
                    onClick={saveAppointment}
                >
                    <i className="bi bi-calendar-check me-2"></i>
                    Confirm Appointment
                </button>
            </div>
        </div>
    );
}

export default AddAppointment;