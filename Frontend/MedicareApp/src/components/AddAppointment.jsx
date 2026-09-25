import React, { useState } from 'react'; 
import AppointmentService from '../services/AppointmentService';

function AddAppointment() {
    const [data, setData] = useState({
        appointmentdate: "",
        timeslot: "",
        reason: "",
        status: "BOOKED",
        paymentstatus: "PENDING",
        user: {
            id: 1
        },
        doctor: {
            id: 1
        }
    })

    const changeData = (e) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }

    const saveAppointment = () => {
        AppointmentService.saveAppointment(data)
            .then((res) => {
                alert("Appointment Booked Successfully")
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h2 className="mb-4 text-center">Book Appointment</h2>
                
                <div className="mb-3">
                    <label className="form-label">Appointment Date:</label>
                    <input type="date" className="form-control" name="appointmentdate" onChange={changeData} value={data.appointmentDate} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Time Slot:</label>
                    <input type="text" className="form-control" name="timeslot" placeholder="e.g., 10:00 AM" onChange={changeData} value={data.timeSlot} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Reason:</label>
                    <input type="text" className="form-control" name="reason" placeholder="e.g., General Checkup" onChange={changeData} value={data.reason} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <input type="text" className="form-control" name="status" onChange={changeData} value={data.status} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Payment Status:</label>
                    <input type="text" className="form-control" name="paymentstatus" onChange={changeData} value={data.paymentStatus} />
                </div>

                <button className="btn btn-primary w-100 mt-2" onClick={saveAppointment}>
                    Book Appointment
                </button>
            </div>
        </div>
    )
}

export default AddAppointment