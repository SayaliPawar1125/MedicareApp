import React, { useState } from 'react'; 
import AppointmentService from '../services/AppointmentService';

function AddAppointment() {
    const [bookingForSelf, setBookingForSelf] = useState(true);

    const [data, setData] = useState({
        appointmentdate: "",
        timeslot: "",
        reason: "",
        status: "BOOKED",
        paymentstatus: "PENDING",
        billamount: 500.0, 
        user: { id: 1 },     
        doctor: { id: 1 },  
        patient: null       
    });

    const [patientDetails, setPatientDetails] = useState({
        firstname: "",
        lastname: "",
        gender: "Female",
        phone: "",
        email: "",
        address: "",
        bloodgroup: ""
    });

    const [errors, setErrors] = useState({});

    const changeData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }

    const changePatientData = (e) => {
        const { name, value } = e.target;
        setPatientDetails(prev => ({ ...prev, [name]: value }));
    }

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!data.appointmentdate) {
            tempErrors.appointmentdate = "Appointment date is required.";
            isValid = false;
        }
        if (!data.timeslot.trim()) {
            tempErrors.timeslot = "Time slot is required.";
            isValid = false;
        }
        if (!data.reason.trim()) {
            tempErrors.reason = "Reason for appointment cannot be blank.";
            isValid = false;
        }

        // Validate family member patient inputs if toggle is unchecked
        if (!bookingForSelf) {
            if (!patientDetails.firstname.trim()) {
                tempErrors.firstname = "Patient's first name is required.";
                isValid = false;
            }
            if (!patientDetails.lastname.trim()) {
                tempErrors.lastname = "Patient's last name is required.";
                isValid = false;
            }
            if (!patientDetails.bloodgroup.trim()) {
                tempErrors.bloodgroup = "Patient's blood group is required.";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    }

    const saveAppointment = () => {
        if (validateForm()) {
            const finalPayload = {
                ...data,
                patient: bookingForSelf ? null : { ...patientDetails }
            };

            console.log("Submitting custom booking transaction:", finalPayload);

            AppointmentService.saveAppointment(finalPayload)
                .then((res) => {
                    alert("Appointment Booked Successfully!");
                })
                .catch((err) => {
                    console.error(err);
                    alert("Server rejection. Check constraint columns or backend logs.");
                });
        }
    }

    return (
        <div className="container mt-4 mb-5">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "550px", margin: "0 auto" }}>
                <h2 className="mb-4 text-center text-primary fw-bold">Book Appointment</h2>
                
                <div className="mb-4 text-center">
                    <label className="form-label d-block fw-bold text-secondary">Who is this appointment for?</label>
                    <div className="btn-group w-100" role="group">
                        <button 
                            type="button" 
                            className={`btn ${bookingForSelf ? 'btn-primary fw-bold' : 'btn-outline-primary'}`}
                            onClick={() => setBookingForSelf(true)}
                        >
                            Book For Myself
                        </button>
                        <button 
                            type="button" 
                            className={`btn ${!bookingForSelf ? 'btn-primary fw-bold' : 'btn-outline-primary'}`}
                            onClick={() => setBookingForSelf(false)}
                        >
                            Book For Someone Else 
                        </button>
                    </div>
                </div>

                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Appointment Date:</label>
                    <input type="date" className={`form-control ${errors.appointmentdate ? 'is-invalid' : ''}`} name="appointmentdate" onChange={changeData} value={data.appointmentdate} />
                    {errors.appointmentdate && <div className="invalid-feedback">{errors.appointmentdate}</div>}
                </div>

                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Time Slot:</label>
                    <input type="text" className={`form-control ${errors.timeslot ? 'is-invalid' : ''}`} name="timeslot" placeholder="e.g., 10:00 AM" onChange={changeData} value={data.timeslot} />
                    {errors.timeslot && <div className="invalid-feedback">{errors.timeslot}</div>}
                </div>

                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Reason / Symptoms:</label>
                    <input type="text" className={`form-control ${errors.reason ? 'is-invalid' : ''}`} name="reason" placeholder="e.g., Routine Checkup or Specific Health Issue" onChange={changeData} value={data.reason} />
                    {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
                </div>

                {!bookingForSelf && (
                    <div className="p-3 border rounded-3 bg-light mb-4">
                        <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                            <i className="bi bi-person-plus-fill me-2 text-primary"></i>Patient Information 
                        </h5>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3 text-start">
                                <label className="form-label small fw-semibold">First Name:</label>
                                <input type="text" className={`form-control form-control-sm ${errors.firstname ? 'is-invalid' : ''}`} name="firstname" placeholder="First Name" onChange={changePatientData} value={patientDetails.firstname} />
                                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                            </div>
                            <div className="col-md-6 mb-3 text-start">
                                <label className="form-label small fw-semibold">Last Name:</label>
                                <input type="text" className={`form-control form-control-sm ${errors.lastname ? 'is-invalid' : ''}`} name="lastname" placeholder="Last Name" onChange={changePatientData} value={patientDetails.lastname} />
                                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3 text-start">
                                <label className="form-label small fw-semibold">Gender:</label>
                                <select className="form-select form-select-sm" name="gender" onChange={changePatientData} value={patientDetails.gender}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3 text-start">
                                <label className="form-label small fw-semibold">Blood Group:</label>
                                <input type="text" className={`form-control form-control-sm ${errors.bloodgroup ? 'is-invalid' : ''}`} name="bloodgroup" placeholder="e.g., O+" onChange={changePatientData} value={patientDetails.bloodgroup} />
                                {errors.bloodgroup && <div className="invalid-feedback">{errors.bloodgroup}</div>}
                            </div>
                        </div>

                        <div className="mb-2 text-start">
                            <label className="form-label small fw-semibold">Contact / Address:</label>
                            <input type="text" className="form-control form-control-sm mb-2" name="phone" placeholder="Phone (10 digits)" onChange={changePatientData} value={patientDetails.phone} />
                            <input type="text" className="form-control form-control-sm" name="address" placeholder="Residential Address" onChange={changePatientData} value={patientDetails.address} />
                        </div>
                    </div>
                )}

                <button className="btn btn-primary w-100 fw-bold py-2 mt-2" onClick={saveAppointment}>
                    Confirm Appointment
                </button>
            </div>
        </div>
    )
}

export default AddAppointment;
