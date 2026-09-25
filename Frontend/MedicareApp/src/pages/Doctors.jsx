import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorServices from '../services/DoctorServices'; 

function Doctors() {
  const navigate = useNavigate();
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DoctorServices.getAllDoctors()
      .then((res) => {
        const data = res.data || res;
        setDoctorsList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors from database:", err);
        setLoading(false);
        setDoctorsList([]); 
      });
  }, []);

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-lg border-0 mb-5 bg-white bg-opacity-95 rounded-3 text-start">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="text-primary fw-bold mb-1">
              <i className="bi bi-person-badge me-2"></i>Our Specialized Medical Team
            </h2>
            <p className="text-muted mb-0">Browse through our highly qualified doctors and book a consultation instantly.</p>
          </div>
          <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">
            Total Doctors: {doctorsList.length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : doctorsList.length === 0 ? (
        <div className="card p-5 text-center shadow border-0 bg-white bg-opacity-95 rounded-3">
          <i className="bi bi-people text-muted mb-3" style={{ fontSize: "3.5rem" }}></i>
          <h4 className="text-dark fw-bold">No Doctors Found</h4>
          <p className="text-muted">The system could not retrieve active doctor records from the database schema.</p>
        </div>
      ) : (
        <div className="row g-4">
          {doctorsList.map((doc) => (
            <div className="col-md-4" key={doc.id}>
              <div className="card h-100 shadow border-0 bg-white bg-opacity-95 text-start rounded-3">
                
                <div className="text-center pt-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary" style={{ width: "90px", height: "90px" }}>
                    <i className="bi bi-person-workspace" style={{ fontSize: "3rem" }}></i>
                  </div>
                </div>

                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <h4 className="fw-bold text-dark text-center mb-1">Dr. {doc.name}</h4>
                    <p className="text-primary fw-semibold text-center small mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-pill">
                        {doc.specialization}
                      </span>
                    </p>
                    
                    <hr className="text-muted my-2" style={{ opacity: 0.15 }} />

                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span><i className="bi bi-award me-1 text-secondary"></i>Experience:</span>
                      <span className="fw-bold text-dark">{doc.experience} Years</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span><i className="bi bi-cash-stack me-1 text-success"></i>Consultation Fee:</span>
                      <span className="fw-bold text-success fs-6">
                        ₹{doc.fees ? Number(doc.fees).toFixed(2) : '0.00'}
                      </span>
                    </div>

                    <p className="card-text text-muted small mt-2" style={{ minHeight: "60px" }}>
                      {doc.description}
                    </p>
                  </div>

                  <button 
                    className="btn btn-primary w-100 fw-bold py-2 rounded-pill mt-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("/add-appointment")}
                  >
                    <i className="bi bi-calendar-plus"></i> Book Appointment
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
