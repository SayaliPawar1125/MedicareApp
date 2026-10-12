import React, { useState, useEffect } from "react";
import AppointmentService from "../services/AppointmentService";

function AppointmentList() {
    const [appointmentlist, setAppointmentList] = useState([]);
    const [statusChanges, setStatusChanges] = useState({});
    const [savingId, setSavingId] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    // Load all appointments
    useEffect(() => {
        AppointmentService.getAllAppointments()
            .then((res) => {
                const receivedData = res.data || res;

                if (Array.isArray(receivedData)) {
                    setAppointmentList(receivedData);
                } else if (
                    receivedData &&
                    Array.isArray(receivedData.appointments)
                ) {
                    setAppointmentList(receivedData.appointments);
                } else {
                    console.log(
                        "Response format check failed:",
                        receivedData
                    );
                    setAppointmentList([]);
                }
            })
            .catch((err) => {
                console.error("Error loading appointments:", err);
                setAppointmentList([]);
                setMessage("Unable to load appointments.");
                setMessageType("danger");
            });
    }, []);

    // Update appointment status
    const handleStatusUpdate = async (id) => {
        const newStatus = statusChanges[id];

        if (!newStatus) {
            setMessage("Please select a status first.");
            setMessageType("warning");
            return;
        }

        const currentAppointment = appointmentlist.find(
            (appointment) => appointment.id === id
        );

        const currentStatus = (
            currentAppointment?.status || "PENDING"
        ).toUpperCase();

        if (newStatus === currentStatus) {
            setMessage("Please select a different status.");
            setMessageType("warning");
            return;
        }

        try {
            setSavingId(id);
            setMessage("");

            const res = await AppointmentService.updateAppointmentStatus(
                id,
                newStatus
            );

            const updatedAppointment = res.data;

            setAppointmentList((previous) =>
                previous.map((appointment) =>
                    appointment.id === id
                        ? {
                              ...appointment,
                              ...updatedAppointment,
                              status: updatedAppointment.status || newStatus,
                          }
                        : appointment
                )
            );

            setStatusChanges((previous) => {
                const updated = { ...previous };
                delete updated[id];
                return updated;
            });

            setMessage(
                `Appointment #${id} status updated to ${newStatus}.`
            );
            setMessageType("success");
        } catch (error) {
            console.error("Error updating appointment status:", error);

            const responseMessage = error.response?.data;
            const readableMessage =
                typeof responseMessage === "string"
                    ? responseMessage
                    : responseMessage?.message;

            setMessage(
                readableMessage || "Unable to update appointment status."
            );
            setMessageType("danger");
        } finally {
            setSavingId(null);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-lg border-0 p-4 bg-white bg-opacity-95 rounded-3">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <h2 className="text-primary fw-bold mb-0">
                        <i className="bi bi-calendar-check me-2"></i>
                        Appointment Details
                    </h2>

                    <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">
                        Total Appointments: {appointmentlist.length}
                    </span>
                </div>

                {/* Status update message */}
                {message && (
                    <div
                        className={`alert alert-${messageType} alert-dismissible fade show`}
                        role="alert"
                    >
                        {message}

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setMessage("")}
                        ></button>
                    </div>
                )}

                {/* Appointment Table */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle border-light">
                        <thead className="table-primary text-dark">
                            <tr>
                                <th scope="col" className="fw-bold">
                                    ID
                                </th>

                                <th scope="col" className="fw-bold">
                                    First Name
                                </th>

                                <th scope="col" className="fw-bold">
                                    Last Name
                                </th>

                                <th scope="col" className="fw-bold">
                                    Assigned Doctor
                                </th>

                                <th scope="col" className="fw-bold">
                                    Booking Date
                                </th>

                                <th scope="col" className="fw-bold">
                                    Time Slot
                                </th>

                                <th
                                    scope="col"
                                    className="fw-bold text-center"
                                >
                                    Status
                                </th>

                                <th
                                    scope="col"
                                    className="fw-bold text-center"
                                >
                                    Payment
                                </th>

                                <th
                                    scope="col"
                                    className="fw-bold text-end"
                                >
                                    Bill Amount
                                </th>

                                <th
                                    scope="col"
                                    className="fw-bold text-center"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointmentlist.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="text-center py-5 text-muted fw-semibold"
                                    >
                                        <i className="bi bi-inbox me-2 fs-4 d-block mb-2"></i>
                                        No active appointments found in the
                                        system database.
                                    </td>
                                </tr>
                            ) : (
                                appointmentlist.map((a) => {
                                    const appointmentStatus = (
                                        a.status || "PENDING"
                                    ).toUpperCase();

                                    const paymentStatus = (
                                        a.paymentstatus || "PENDING"
                                    ).toUpperCase();

                                    const patientFirstName = a.patient
                                        ? a.patient.firstname || "N/A"
                                        : a.user?.firstname || "N/A";

                                    const patientLastName = a.patient
                                        ? a.patient.lastname || "N/A"
                                        : a.user?.lastname || "N/A";

                                    const doctorName =
                                        a.doctor?.name || "Assigned soon";

                                    const selectedStatus =
                                        statusChanges[a.id] ??
                                        appointmentStatus;

                                    return (
                                        <tr key={a.id}>
                                            {/* ID */}
                                            <td className="fw-bold text-secondary">
                                                #{a.id}
                                            </td>

                                            {/* Patient First Name */}
                                            <td className="fw-semibold text-dark">
                                                <i className="bi bi-person-circle text-primary me-2"></i>
                                                {patientFirstName}
                                            </td>

                                            {/* Patient Last Name */}
                                            <td className="fw-semibold text-dark">
                                                {patientLastName}
                                            </td>

                                            {/* Doctor */}
                                            <td>
                                                <span className="fw-semibold text-primary">
                                                    <i className="bi bi-person-badge me-1"></i>
                                                    Dr. {doctorName}
                                                </span>
                                            </td>

                                            {/* Appointment Date */}
                                            <td>
                                                {a.appointmentdate || "N/A"}
                                            </td>

                                            {/* Time Slot */}
                                            <td>
                                                <span className="badge bg-light text-dark border px-2 py-1">
                                                    <i className="bi bi-clock text-muted me-1"></i>
                                                    {a.timeslot || "N/A"}
                                                </span>
                                            </td>

                                            {/* Appointment Status */}
                                            <td className="text-center">
                                                <span
                                                    className={`badge px-3 py-2 rounded-pill ${
                                                        appointmentStatus === "BOOKED"
                                                            ? "bg-success bg-opacity-10 text-success fw-bold"
                                                            : appointmentStatus === "CANCELLED"
                                                              ? "bg-danger bg-opacity-10 text-danger fw-bold"
                                                              : appointmentStatus === "COMPLETED"
                                                                ? "bg-primary bg-opacity-10 text-primary fw-bold"
                                                                : "bg-warning bg-opacity-10 text-warning fw-bold"
                                                    }`}
                                                >
                                                    {appointmentStatus}
                                                </span>
                                            </td>

                                            {/* Payment Status */}
                                            <td className="text-center">
                                                <span
                                                    className={`badge px-3 py-2 rounded-pill fw-bold ${
                                                        paymentStatus === "PAID"
                                                            ? "bg-success text-white"
                                                            : paymentStatus === "FAILED"
                                                              ? "bg-danger text-white"
                                                              : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {paymentStatus}
                                                </span>
                                            </td>

                                            {/* Bill Amount */}
                                            <td className="text-end fw-bold text-dark fs-6">
                                                ₹
                                                {a.billamount !== null &&
                                                a.billamount !== undefined
                                                    ? Number(
                                                          a.billamount
                                                      ).toFixed(2)
                                                    : "0.00"}
                                            </td>

                                            {/* Update Status */}
                                            <td className="text-center">
                                                <div className="d-flex flex-column gap-2 align-items-center">
                                                    <select
                                                        className="form-select form-select-sm"
                                                        style={{
                                                            minWidth: "145px",
                                                        }}
                                                        aria-label={`Status for appointment ${a.id}`}
                                                        value={selectedStatus}
                                                        disabled={
                                                            savingId === a.id
                                                        }
                                                        onChange={(e) =>
                                                            setStatusChanges(
                                                                (previous) => ({
                                                                    ...previous,
                                                                    [a.id]: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <option value="PENDING">
                                                            Pending
                                                        </option>

                                                        <option value="BOOKED">
                                                            Booked
                                                        </option>

                                                        <option value="COMPLETED">
                                                            Completed
                                                        </option>

                                                        <option value="CANCELLED">
                                                            Cancelled
                                                        </option>
                                                    </select>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                a.id
                                                            )
                                                        }
                                                        disabled={
                                                            savingId === a.id ||
                                                            selectedStatus ===
                                                                appointmentStatus
                                                        }
                                                    >
                                                        {savingId === a.id
                                                            ? "Saving..."
                                                            : "Update Status"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AppointmentList;