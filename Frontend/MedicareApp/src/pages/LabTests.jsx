
import { useEffect, useMemo, useState } from "react";
import LabTestServices from "../services/LabTestServices";

function LabTest() {
  const [labTests, setLabTests] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load lab tests from Spring Boot using the existing service
  const fetchLabTests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await LabTestServices.getAllLabTests();

      if (Array.isArray(response.data)) {
        setLabTests(response.data);
      } else {
        setLabTests([]);
      }
    } catch (err) {
      console.error("Lab test API error:", err);
      setError("Unable to load lab tests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabTests();
  }, []);

  // Get categories from database records
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        labTests
          .map((test) => test.category)
          .filter(Boolean)
      ),
    ];
  }, [labTests]);

  // Search and category filter
  const filteredTests = useMemo(() => {
    return labTests.filter((test) => {
      const term = search.trim().toLowerCase();

      const matchesSearch =
        (test.name || "").toLowerCase().includes(term) ||
        (test.description || "").toLowerCase().includes(term) ||
        (test.category || "").toLowerCase().includes(term);

      const matchesCategory =
        category === "All" || test.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [labTests, search, category]);

  const icons = [
    "bi-droplet-half",
    "bi-heart-pulse",
    "bi-activity",
    "bi-eyedropper",
  ];

  // Format price in Indian Rupees
  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <div className="container py-4">

      {/* White Banner - Similar to Doctors Page */}
      <div className="card bg-white border-0 shadow-sm rounded-3 p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-primary mb-1">
              <i className="bi bi-clipboard2-pulse me-2"></i>
              Our Diagnostic Lab Tests
            </h2>

            <p className="text-secondary mb-0">
              Explore our diagnostic tests and find the right tests
              for your healthcare needs.
            </p>
          </div>

          <span className="badge bg-primary rounded-pill fs-6 px-3 py-2 shadow-sm">
            Total Lab Tests: {labTests.length}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">

        <div className="col-6 col-md-4">
          <div className="card bg-white border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-clipboard2-pulse fs-3 text-primary"></i>

            <h3 className="fw-bold mt-2 mb-1">
              {labTests.length}
            </h3>

            <span className="text-muted">Available Tests</span>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="card bg-white border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-grid fs-3 text-success"></i>

            <h3 className="fw-bold mt-2 mb-1">
              {categories.length - 1}
            </h3>

            <span className="text-muted">Test Categories</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-white border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-search fs-3 text-info"></i>

            <h5 className="fw-bold mt-2 mb-1">
              Find Your Test
            </h5>

            <span className="text-muted">
              Search our test catalogue
            </span>
          </div>
        </div>

      </div>

      {/* Search and Category Filter */}
      <div className="card bg-white border-0 shadow-sm rounded-4 p-3 mb-4">
        <div className="row g-3">

          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search test name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Lab Tests Heading - No Result Count */}
      <h3 className="fw-bold text-primary mb-3">
        Explore Lab Tests
      </h3>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted mt-3">
            Loading lab tests...
          </p>
        </div>
      )}

      {/* API Error */}
      {!loading && error && (
        <div className="alert alert-warning" role="alert">
          {error}

          <button
            className="btn btn-outline-primary btn-sm ms-3"
            onClick={fetchLabTests}
          >
            Retry
          </button>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && filteredTests.length === 0 && (
        <div className="card bg-white border-0 shadow-sm rounded-4 text-center p-5">
          <i className="bi bi-clipboard-x display-3 text-secondary"></i>

          <h4 className="fw-bold mt-3">
            No Lab Tests Found
          </h4>

          <p className="text-muted">
            Try another search term or category.
          </p>

          <button
            className="btn btn-outline-primary align-self-center"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Responsive Lab Test Cards - No Details Button */}
      {!loading && !error && filteredTests.length > 0 && (
        <div className="row g-4">
          {filteredTests.map((test, index) => (
            <div
              className="col-sm-6 col-lg-4"
              key={test.id}
            >
              <div className="card bg-white border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4 d-flex flex-column">

                  {/* Icon and Category */}
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div className="rounded-4 bg-primary-subtle text-primary d-flex justify-content-center align-items-center p-3">
                      <i
                        className={`bi ${icons[index % icons.length]} fs-3`}
                      ></i>
                    </div>

                    <span className="badge rounded-pill bg-primary-subtle text-primary">
                      {test.category}
                    </span>
                  </div>

                  {/* Test Name */}
                  <h5 className="fw-bold mb-2">
                    {test.name}
                  </h5>

                  {/* Test Description */}
                  <p className="text-muted small flex-grow-1">
                    {test.description}
                  </p>

                  <hr />

                  {/* Test Price */}
                  <div>
                    <small className="text-muted d-block">
                      Test Price
                    </small>

                    <h5 className="fw-bold text-success mb-0">
                      {formatPrice(test.price)}
                    </h5>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default LabTest;

