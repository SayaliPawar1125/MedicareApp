
import { useEffect, useState } from "react";
import LabTestServices from "../services/LabTestServices";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  price: "",
};

function AdminLabTests() {
  const [labTests, setLabTests] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchLabTests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await LabTestServices.getAllLabTests();
      setLabTests(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Load lab tests error:", err);
      setError("Unable to load lab tests. Check your backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabTests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setError("Enter all fields and a valid, non-negative price.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price),
    };

    try {
      setSaving(true);

      if (editingId !== null) {
        await LabTestServices.updateLabTest(editingId, payload);
        setMessage("Lab test updated successfully.");
      } else {
        await LabTestServices.addLabTest(payload);
        setMessage("Lab test added successfully.");
      }

      resetForm();
      await fetchLabTests();
    } catch (err) {
      console.error("Save lab test error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to save the lab test. Check the backend response."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (test) => {
    setEditingId(test.id);
    setForm({
      name: test.name ?? "",
      category: test.category ?? "",
      description: test.description ?? "",
      price: test.price ?? "",
    });
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (test) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${test.name}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await LabTestServices.deleteLabTest(test.id);
      setMessage("Lab test deleted successfully.");

      if (editingId === test.id) resetForm();

      await fetchLabTests();
    } catch (err) {
      console.error("Delete lab test error:", err);
      setError("Unable to delete the lab test.");
    }
  };

  const filteredTests = labTests.filter((test) => {
    const term = search.trim().toLowerCase();

    return (
      (test.name ?? "").toLowerCase().includes(term) ||
      (test.category ?? "").toLowerCase().includes(term) ||
      (test.description ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="container py-4 mb-5">
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="text-primary fw-bold mb-1">
              <i className="bi bi-clipboard2-pulse me-2"></i>
              Admin Lab Tests
            </h2>
            <p className="text-muted mb-0">
              Add, update, and manage diagnostic lab tests.
            </p>
          </div>

          <span className="badge bg-primary fs-6 px-3 py-2">
            Total: {labTests.length}
          </span>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {typeof error === "string" ? error : "The operation failed."}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="status">
          {message}
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h4 className="fw-bold mb-3">
          {editingId !== null ? "Edit Lab Test" : "Add New Lab Test"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Test Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Complete Blood Count"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Blood Test"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter test description"
                required
              />
            </div>

            <div className="col-12 d-flex gap-2 flex-wrap">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update Lab Test"
                    : "Add Lab Test"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h4 className="fw-bold mb-0">Lab Test Records</h4>

          <input
            className="form-control"
            style={{ maxWidth: "320px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lab tests..."
            aria-label="Search lab tests"
          />
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading lab tests...</p>
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center text-muted py-4">
            No lab tests found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Test Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.id}</td>
                    <td className="fw-semibold">{test.name}</td>
                    <td>
                      <span className="badge bg-primary-subtle text-primary">
                        {test.category}
                      </span>
                    </td>
                    <td>{test.description}</td>
                    <td>
                      ₹{Number(test.price).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(test)}
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(test)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLabTests;
