
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    totalMedicines: 0,
    totalLabTests: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await api.get("/api/admin/dashboard/counts");
        setCounts((previous) => ({ ...previous, ...response.data }));
        setError("");
      } catch (err) {
        console.error("Dashboard counts error:", err);
        setError(
          "Unable to load dashboard counts. Please check the backend API."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, []);

  const cards = [
    {
      title: "Appointments",
      count: counts.totalAppointments,
      description: "View all patient appointments.",
      icon: "bi-calendar-check",
      color: "primary",
      link: "/appointments",
      button: "View Appointments",
    },
    {
      title: "Doctors",
      count: counts.totalDoctors,
      description: "Manage doctor records.",
      icon: "bi-person-badge",
      color: "success",
      link: "/admin-doctors",
      button: "Manage Doctors",
    },
    {
      title: "Medicines",
      count: counts.totalMedicines,
      description: "Manage medicine records.",
      icon: "bi-capsule",
      color: "warning",
      link: "/admin-medicines",
      button: "Manage Medicines",
    },
    {
      title: "Lab Tests",
      count: counts.totalLabTests,
      description: "Manage available lab tests.",
      icon: "bi-eyedropper",
      color: "info",
      link: "/admin-labtests",
      button: "Manage Lab Tests",
    },
    {
      title: "Orders",
      count: counts.totalOrders,
      description: "View and manage customer orders.",
      icon: "bi-cart-check",
      color: "secondary",
      link: "/admin-orders",
      button: "Coming Next",
    },
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-lg border-0 rounded-3 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-primary fw-bold mb-1">
              <i className="bi bi-speedometer2 me-2"></i>
              Medicare Admin Dashboard
            </h2>
            <p className="text-muted mb-0">
              Manage your Medicare application.
            </p>
          </div>

          <span className="badge bg-danger px-3 py-2">ADMIN</span>
        </div>

        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-md-6 col-lg-4" key={card.title}>
              <div
                className={`card border-${card.color} shadow-sm h-100`}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <i
                      className={`bi ${card.icon} fs-1 text-${card.color}`}
                    ></i>

                    <span className={`badge bg-${card.color} fs-6`}>
                      {loading ? "..." : card.count}
                    </span>
                  </div>

                  <h5 className="mt-3">{card.title}</h5>

                  <p className="text-muted">{card.description}</p>

                  {card.link ? (
                    <Link
                      to={card.link}
                      className={`btn btn-${card.color}`}
                    >
                      {card.button}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled
                    >
                      {card.button}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
