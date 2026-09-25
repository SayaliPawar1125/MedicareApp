import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

function Navbar() {
  const navigate = useNavigate();

  return (
  
   
<nav className="navbar navbar-expand-lg fixed-top bg-white navbar-light shadow-sm border-bottom border-light-subtle py-2 px-3">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary fs-3 d-flex align-items-center" to="/">
          <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
          Medicare
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#medicareNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="medicareNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-2">

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark-emphasis" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-secondary" to="/doctors">
                Doctors
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link fw-semibold text-secondary" to="/appointments">
                Appointments
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-secondary" to="/testlab">
                Test Lab
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-secondary" to="/medicines">
                Medicine
              </Link>
            </li>

           
            

          </ul>

         {/* login */}
          <div className="d-flex gap-2 align-items-center">
            <Link className="btn btn-outline-primary fw-bold px-4 rounded-pill shadow-sm" to="/#">
              Login
            </Link>

            <button className="btn btn-primary fw-bold px-4 rounded-pill shadow-sm d-flex align-items-center" 
                    onClick={() => navigate("/add-appointment")}>
              <i className="bi bi-calendar-check me-2"></i>
              Book Appointment
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
