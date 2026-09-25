
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const quickStats = [
    { title: "Active Doctors", count: "12+", icon: "bi-person-heart", color: "text-primary" },
    { title: "Medicines Available", count: "150+", icon: "bi-capsule", color: "text-success" },
    { title: "Lab Tests Open", count: "25+", icon: "bi-clipboard2-pulse", color: "text-info" }
  ];

  const actionCards = [
    {
      title: "Book Appointment",
      description: "Schedule a visit with our specialized doctors instantly.",
      icon: "bi-calendar-plus-fill",
      route: "/add-appointment",
      btnClass: "btn-primary"
    },
    {
      title: "View Appointments",
      description: "Track your booking history, confirmations, and billing status.",
      icon: "bi-clock-history",
      route: "/appointments",
      btnClass: "btn-success"
    },
    {
      title: "Medical Store",
      description: "Browse prescription drugs, health supplements, and refill your cart.",
      icon: "bi-shop",
      route: "/medicines", 
       btnClass: "btn-success"
    }
  ];

  return (
    <div className="container py-4">
      <div className="card p-5 shadow-lg border-0 mb-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <div className="row align-items-center">
          <div className="col-md-8 text-start">
            <h1 className="display-4 fw-bold text-primary mb-2">Welcome to Medicare</h1>
            <p className="text-muted lead">
              Your health, our priority. Book appointments, order medicines, and manage your digital healthcare needs seamlessly.
            </p>
          </div>
          <div className="col-md-4 text-center d-none d-md-block">
            <i className="bi bi-heart-pulse-fill text-danger" style={{ fontSize: "6rem" }}></i>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm border-0 text-center h-100" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
              <i className={`bi ${stat.icon} ${stat.color} mb-2`} style={{ fontSize: "2rem" }}></i>
              <h5 className="text-muted mb-1">{stat.title}</h5>
              <h3 className="fw-bold">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-primary fw-bold text-start mb-3">Quick Actions</h3>
      <div className="row">
        {actionCards.map((card, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0 p-4 d-flex flex-column justify-content-between" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <div className="text-start">
                <div className="mb-3">
                  <i className={`bi ${card.icon}`} style={{ fontSize: "2.5rem", color: "var(--bs-primary)" }}></i>
                </div>
                <h4 className="fw-bold text-dark">{card.title}</h4>
                <p className="text-muted small">{card.description}</p>
              </div>
              <button 
                className={`btn ${card.btnClass} w-100 fw-bold mt-3 py-2`}
                onClick={() => navigate(card.route)}
              >
                Go to Page
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
