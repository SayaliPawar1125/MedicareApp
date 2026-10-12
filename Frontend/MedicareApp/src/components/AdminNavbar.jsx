
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    navigate("/login", { replace: true });
    window.location.reload();
  };

  const navLinkClass = (path) =>
    `nav-link fw-semibold ${location.pathname === path
      ? "text-primary"
      : "text-secondary"
    }`;

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white navbar-light shadow-sm border-bottom border-light-subtle py-2 px-3">
      <div className="container">

        {/* ADMIN BRAND */}
        <Link
          className="navbar-brand fw-bold text-primary fs-3 d-flex align-items-center"
          to="/admin-dashboard"
        >
          <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
          Medicare
          <span className="badge bg-danger ms-2" style={{ fontSize: "10px" }}>
            ADMIN
          </span>
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#medicareAdminNavbar"
          aria-controls="medicareAdminNavbar"
          aria-expanded="false"
          aria-label="Toggle admin navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="medicareAdminNavbar"
        >
          {/* ADMIN LINKS */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-2">

            <li className="nav-item">
              <Link
                className={navLinkClass("/admin-dashboard")}
                to="/admin-dashboard"
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={navLinkClass("/appointments")}
                to="/appointments"
              >
                <i className="bi bi-calendar-check me-1"></i>
                Appointments
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={navLinkClass("/admin-doctors")}
                to="/admin-doctors"
              >
                <i className="bi bi-person-badge me-1"></i>
                Doctors
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={navLinkClass("/admin-medicines")}
                to="/admin-medicines"
              >
                <i className="bi bi-capsule me-1"></i>
                Medicines
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={navLinkClass("/admin-labtests")}
                to="/admin-labtests"
              >
                <i className="bi bi-eyedropper me-1"></i>
                Lab Tests
              </Link>
            </li>

            <li>
              <Link
                to="/admin-orders"
                className={navLinkClass("/admin-orders")}
              >
                <i className="bi bi-cart-check me-1"></i>
                Orders
              </Link>
            </li>

          </ul>

          {/* ADMIN ACTIONS */}
          <div className="d-flex gap-2 align-items-center">
            <span className="text-secondary small fw-semibold d-none d-xl-inline">
              <i className="bi bi-shield-check text-success me-1"></i>
              Administrator
            </span>

            <Link
              to="/"
              className="btn btn-outline-primary fw-semibold rounded-pill px-3"
            >
              <i className="bi bi-house me-1"></i>
              View Store
            </Link>

            <button
              type="button"
              className="btn btn-danger fw-bold rounded-pill px-3"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
