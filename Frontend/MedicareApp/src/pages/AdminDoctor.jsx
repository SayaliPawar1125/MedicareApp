import React, { useEffect, useState } from "react";
import api from "../services/api";

const emptyDoctor = {
name: "",
specialization: "",
experience: "",
fees: "",
description: "",
image: ""
};

function AdminDoctors() {
const [doctors, setDoctors] = useState([]);
const [form, setForm] = useState(emptyDoctor);
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");
const [message, setMessage] = useState("");

const loadDoctors = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await api.get(
            "/api/doctor/getAlldoctors"
        );

        const data = response.data;
        setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
        console.error("Error loading doctors:", err);
        setError("Unable to load doctors. Please try again.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    loadDoctors();
}, []);

const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
        ...previous,
        [name]: value
    }));
};

const resetForm = () => {
    setForm(emptyDoctor);
    setEditingId(null);
    setError("");
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (
        !form.name.trim() ||
        !form.specialization.trim() ||
        !form.experience ||
        !form.fees ||
        !form.description.trim()
    ) {
        setError("Please fill in all required fields.");
        return;
    }

    if (
        Number(form.experience) < 1 ||
        Number(form.fees) <= 0
    ) {
        setError("Experience must be at least 1 year and fees must be positive.");
        return;
    }

    const doctorData = {
        name: form.name.trim(),
        specialization: form.specialization.trim(),
        experience: Number(form.experience),
        fees: Number(form.fees),
        description: form.description.trim(),
        image: form.image.trim() || null
    };

    try {
        setSaving(true);

        if (editingId !== null) {
            await api.put(
                `/api/doctor/updateDoctor/${editingId}`,
                doctorData
            );
            setMessage("Doctor updated successfully.");
        } else {
            await api.post(
                "/api/doctor/savedoctor",
                doctorData
            );
            setMessage("Doctor added successfully.");
        }

        resetForm();
        await loadDoctors();
    } catch (err) {
        console.error("Error saving doctor:", err);

        if (err.response?.status === 403) {
            setError("Access denied. Please log in with an admin account.");
        } else {
            setError(
                err.response?.data?.message ||
                "Unable to save doctor. Check the backend logs."
            );
        }
    } finally {
        setSaving(false);
    }
};

const handleEdit = (doctor) => {
    setEditingId(doctor.id);
    setForm({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        experience: doctor.experience ?? "",
        fees: doctor.fees ?? "",
        description: doctor.description || "",
        image: doctor.image || ""
    });

    setError("");
    setMessage("");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

const handleDelete = async (doctor) => {
    const confirmed = window.confirm(
        `Are you sure you want to delete Dr. ${doctor.name}?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
        await api.delete(
            `/api/doctor/deleteDoctor/${doctor.id}`
        );

        setMessage("Doctor deleted successfully.");

        if (editingId === doctor.id) {
            resetForm();
        }

        await loadDoctors();
    } catch (err) {
        console.error("Error deleting doctor:", err);

        if (err.response?.status === 403) {
            setError("Access denied. Only admins can delete doctors.");
        } else {
            setError(
                err.response?.data?.message ||
                "Unable to delete doctor. The doctor may have existing appointments."
            );
        }
    }
};




return (
    <div className="container my-4 mb-5">
        <div className="card border-0 shadow-lg rounded-3 p-4 bg-white bg-opacity-95">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <div>
                    <h2 className="text-primary fw-bold mb-1">
                        <i className="bi bi-person-badge me-2"></i>
                        Doctor Management
                    </h2>
                    <p className="text-muted mb-0">
                        Add, edit, view, and manage doctor records.
                    </p>
                </div>

                <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
                    Total Doctors: {doctors.length}
                </span>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {message && (
                <div className="alert alert-success" role="status">
                    {message}
                </div>
            )}

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-primary text-white py-3">
                    <h5 className="mb-0 fw-bold">
                        {editingId !== null ? "Edit Doctor" : "Add New Doctor"}
                    </h5>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Doctor Name *
                                </label>
                                <input
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter doctor name"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Specialization *
                                </label>
                                <input
                                    className="form-control"
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={handleChange}
                                    placeholder="e.g. Cardiologist"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Experience (years) *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Consultation Fee (₹) *
                                </label>
                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    className="form-control"
                                    name="fees"
                                    value={form.fees}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    Description *
                                </label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter doctor description"
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="url"
                                    className="form-control"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/doctor.jpg"
                                />
                            </div>

                            <div className="col-12 d-flex gap-2 flex-wrap">
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-bold"
                                    disabled={saving}
                                >
                                    <i className={`bi ${editingId !== null ? "bi-check-circle" : "bi-plus-circle"} me-2`}></i>
                                    {saving
                                        ? "Saving..."
                                        : editingId !== null
                                            ? "Update Doctor"
                                            : "Add Doctor"}
                                </button>

                                {editingId !== null && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={resetForm}
                                        disabled={saving}
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <h5 className="fw-bold text-dark mb-3">
                <i className="bi bi-list-ul me-2"></i>
                Existing Doctors
            </h5>

            {loading ? (
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : doctors.length === 0 ? (
                <div className="alert alert-info">
                    No doctors found in the database.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Doctor</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Fees</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td className="fw-bold">
                                        #{doctor.id}
                                    </td>
                                    <td className="fw-semibold">
                                        Dr. {doctor.name}
                                    </td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.experience} years</td>
                                    <td className="text-success fw-bold">
                                        ₹{Number(doctor.fees || 0).toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handleEdit(doctor)}
                                                title="Edit doctor"
                                            >
                                                <i className="bi bi-pencil-square me-1"></i>
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(doctor)}
                                                title="Delete doctor"
                                            >
                                                <i className="bi bi-trash me-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
);


}

export default AdminDoctors;
