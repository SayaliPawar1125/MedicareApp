import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import CartServices from '../services/CartServices'; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const updateCartIndicator = () => {
    CartServices.getAllCartItems()
      .then((res) => {
        const dataList = res.data || [];
        setCartCount(Array.isArray(dataList) ? dataList.length : 0);
      })
      .catch((err) => {
        console.error("Failed to update navbar shopping count asset indicator:", err);
        setCartCount(0);
      });
  };

  useEffect(() => {
    updateCartIndicator();
  }, [location]);

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
              <Link className="nav-link fw-semibold text-secondary" to="/labtest">
                Test Lab
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-secondary" to="/medicines">
                Medicine
              </Link>
            </li>

          </ul>

          <div className="d-flex gap-2 align-items-center">
            
            <button 
              className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm border border-light-subtle me-2"
              style={{ width: "42px", height: "42px" }}
              onClick={() => navigate("/cart")}
              type="button"
            >
              <i className="bi bi-cart3 fs-5 text-dark"></i>
              
              {cartCount > 0 && (
                <span 
                  className="position-absolute translate-middle badge rounded-pill bg-danger border border-white"
                  style={{ top: '4px', left: '38px', fontSize: '0.7rem' }}
                >
                  {cartCount}
                  <span className="visually-hidden">unread items count</span>
                </span>
              )}
            </button>

            <Link className="btn btn-outline-primary fw-bold px-4 rounded-pill shadow-sm" to="/login">
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
