import React, { useState, useEffect } from 'react';
import AppointmentService from '../services/AppointmentService';

function AppointmentList() {
    const [appointmentlist, setAppointmentList] = useState([]);

    useEffect(() => {
        AppointmentService.getAllAppointments()
            .then((res) => {
                let receivedData = res.data || res;
                
                if (Array.isArray(receivedData)) {
                    setAppointmentList(receivedData);
                } else if (receivedData && Array.isArray(receivedData.appointments)) {
                    setAppointmentList(receivedData.appointments);
                } else {
                    console.log("Response format check failed, setting to empty list:", receivedData);
                    setAppointmentList([]);
                }
            })
            .catch((err) => {
                console.log("Error loading data from server:", err);
                setAppointmentList([]); 
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="card shadow-lg border-0 p-4 bg-white bg-opacity-95 rounded-3">
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary fw-bold mb-0">
                        <i className="bi bi-calendar-check me-2"></i>Appointment Details
                    </h2>
                    <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">
                        Total Appointments: {appointmentlist.length}
                    </span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle border-light">
                        <thead className="table-primary text-dark">
                            <tr>
                                <th scope="col" className="fw-bold">ID</th>
                                <th scope="col" className="fw-bold">Patient Name</th>
                                <th scope="col" className="fw-bold">Assigned Doctor</th>
                                <th scope="col" className="fw-bold">Booking Date</th>
                                <th scope="col" className="fw-bold">Time Slot</th>
                                <th scope="col" className="fw-bold text-center">Status</th>
                                <th scope="col" className="fw-bold text-center">Payment</th>
                                <th scope="col" className="fw-bold text-end">Bill Amount</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {appointmentlist.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted fw-semibold">
                                        <i className="bi bi-inbox me-2 fs-4 d-block mb-2"></i>
                                        No active appointments found in the system database.
                                    </td>
                                </tr>
                            ) : (
                                appointmentlist.map((a) => (
                                    <tr key={a.id}>
                                        <td className="fw-bold text-secondary">#{a.id}</td>
                                        <td className="fw-semibold text-dark">{a.user ? a.user.name : 'N/A'}</td>
                                        <td>
                                            <span className="fw-semibold text-primary">
                                                Dr. {a.doctor ? a.doctor.name : 'Assigned soon'}
                                            </span>
                                        </td>
                                        <td>{a.appointmentdate}</td>
                                        <td>
                                            <span className="badge bg-light text-dark border px-2 py-1">
                                                <i className="bi bi-clock text-muted me-1"></i>{a.timeslot}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {/* Beautiful dynamic badge wrapper for booking status */}
                                            <span className={`badge px-3 py-2 rounded-pill ${
                                                a.status === 'Booked' || a.status === 'BOOKED' || a.status === 'Paid'
                                                    ? 'bg-success bg-opacity-10 text-success fw-bold'
                                                    : 'bg-warning bg-opacity-10 text-warning fw-bold'
                                            }`}>
                                                {a.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge px-3 py-2 rounded-pill fw-bold ${
                                                a.paymentstatus === 'Paid' || a.paymentstatus === 'PAID'
                                                    ? 'bg-success text-white'
                                                    : 'bg-danger text-white'
                                            }`}>
                                                {a.paymentstatus}
                                            </span>
                                        </td>
                                        <td className="text-end fw-bold text-dark fs-6">
                                            ₹{a.billamount ? Number(a.billamount).toFixed(2) : '0.00'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default AppointmentList;
