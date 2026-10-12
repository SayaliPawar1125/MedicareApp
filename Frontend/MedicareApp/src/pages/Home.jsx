
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function Home() {
  const navigate = useNavigate();

  const [quickStats, setQuickStats] = useState([
    {
      title: "Active Doctors",
      count: "...",
      icon: "bi-person-heart",
      color: "text-primary"
    },
    {
      title: "Medicines Available",
      count: "...",
      icon: "bi-capsule",
      color: "text-success"
    },
    {
      title: "Lab Tests Open",
      count: "...",
      icon: "bi-clipboard2-pulse",
      color: "text-info"
    }
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      const getCount = (data) => {
        // Handles APIs returning a normal array
        if (Array.isArray(data)) {
          return data.length;
        }

        // Handles APIs returning Spring Page data
        if (Array.isArray(data?.content)) {
          return data.totalElements ?? data.content.length;
        }

        // Handles APIs returning an object containing a list
        if (Array.isArray(data?.data)) {
          return data.data.length;
        }

        return 0;
      };

      const results = await Promise.allSettled([
        api.get("/api/doctor/getAlldoctors"),
        api.get("/api/medicine/getAllmedicines"),
        api.get("/api/labtests/getAlllabtest")
      ]);

      setQuickStats((previousStats) =>
        previousStats.map((stat, index) => {
          const result = results[index];

          if (result.status === "fulfilled") {
            return {
              ...stat,
              count: getCount(result.value.data)
            };
          }

          console.error(
            `Failed to fetch ${stat.title}:`,
            result.reason
          );

          return {
            ...stat,
            count: "N/A"
          };
        })
      );
    };

    fetchCounts();
  }, []);

  const actionCards = [
    {
      title: "Book Appointment",
      description:
        "Schedule a visit with our specialized doctors instantly.",
      icon: "bi-calendar-plus-fill",
      route: "/add-appointment",
      btnClass: "btn-primary"
    },
    {
    title: "View Lab Tests",
    description:
      "Explore available lab tests, prices, and test details.",
    icon: "bi-clipboard2-pulse",
    route: "/labtest",
    btnClass: "btn-success"
  },
    {
      title: "Medical Store",
      description:
        "Browse prescription drugs, health supplements, and refill your cart.",
      icon: "bi-shop",
      route: "/medicines",
      btnClass: "btn-primary"
    }
  ];

  return (
    <div className="container py-4">
      <div
        className="card p-5 shadow-lg border-0 mb-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)"
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-8 text-start">
            <h1 className="display-4 fw-bold text-primary mb-2">
              Welcome to Medicare
            </h1>

            <p className="text-muted lead">
              Your health, our priority. Book appointments, order
              medicines, and manage your digital healthcare needs
              seamlessly.
            </p>
          </div>

          <div className="col-md-4 text-center d-none d-md-block">
            <i
              className="bi bi-heart-pulse-fill text-danger"
              style={{ fontSize: "6rem" }}
            ></i>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {quickStats.map((stat) => (
          <div key={stat.title} className="col-md-4 mb-3">
            <div
              className="card p-3 shadow-sm border-0 text-center h-100"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)"
              }}
            >
              <i
                className={`bi ${stat.icon} ${stat.color} mb-2`}
                style={{ fontSize: "2rem" }}
              ></i>

              <h5 className="text-muted mb-1">{stat.title}</h5>
              <h3 className="fw-bold">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-primary fw-bold text-start mb-3">
        Quick Actions
      </h3>

      <div className="row">
        {actionCards.map((card) => (
          <div key={card.title} className="col-md-4 mb-3">
            <div
              className="card h-100 shadow-sm border-0 p-4 d-flex flex-column justify-content-between"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)"
              }}
            >
              <div className="text-start">
                <div className="mb-3">
                  <i
                    className={`bi ${card.icon}`}
                    style={{
                      fontSize: "2.5rem",
                      color: "var(--bs-primary)"
                    }}
                  ></i>
                </div>

                <h4 className="fw-bold text-dark">
                  {card.title}
                </h4>

                <p className="text-muted small">
                  {card.description}
                </p>
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