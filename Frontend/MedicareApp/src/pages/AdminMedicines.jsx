
import React, { useEffect, useState } from "react";
import MedicineServices from "../services/MedicineServices";

function AdminMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    price: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  const getMedicineId = (medicine) =>
    medicine.med_id ?? medicine.id;

  const loadMedicines = async () => {
    setLoading(true);

    try {
      const response = await MedicineServices.getAllMedicines();
      const data = response.data ?? response;

      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading medicines:", error);
      setMessage("Unable to load medicines. Check the backend API.");
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      form.price === "" ||
      !form.description.trim()
    ) {
      setMessage("Please fill in all medicine fields.");
      setMessageType("danger");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      setMessage("Price must be greater than zero.");
      setMessageType("danger");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price,
      description: form.description.trim(),
    };

    setSaving(true);

    try {
      if (editingId !== null) {
        await MedicineServices.updateMedicine(editingId, payload);
        setMessage("Medicine updated successfully.");
      } else {
        await MedicineServices.addMedicine(payload);
        setMessage("Medicine added successfully.");
      }

      setMessageType("success");
      resetForm();
      await loadMedicines();
    } catch (error) {
      console.error("Medicine save error:", error);
      console.error("Backend response:", error.response?.data);

      setMessage(
        error.response?.data?.message ||
          "Unable to save medicine. Check your backend endpoints."
      );
      setMessageType("danger");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(getMedicineId(medicine));

    setForm({
      name: medicine.name ?? "",
      category: medicine.category ?? "",
      price: medicine.price ?? "",
      description: medicine.description ?? "",
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (medicine) => {
    const id = getMedicineId(medicine);

    if (id == null) {
      setMessage("Medicine ID is missing.");
      setMessageType("danger");
      return;
    }

    if (!window.confirm(`Delete ${medicine.name}?`)) {
      return;
    }

    try {
      await MedicineServices.deleteMedicine(id);

      setMedicines((previous) =>
        previous.filter((item) => getMedicineId(item) !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage("Medicine deleted successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("Medicine delete error:", error);
      setMessage("Unable to delete medicine. Check the backend API.");
      setMessageType("danger");
    }
  };

  return (
    <div className="container my-4 mb-5">
      <div className="card shadow-lg border-0 rounded-3 p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h2 className="text-primary fw-bold mb-1">
              <i className="bi bi-capsule me-2"></i>
              Manage Medicines
            </h2>
            <p className="text-muted mb-0">
              Add, update, view, and delete pharmacy medicines.
            </p>
          </div>

          <span className="badge bg-warning text-dark px-3 py-2 fs-6">
            Total: {medicines.length}
          </span>
        </div>

        {message && (
          <div
            className={`alert alert-${messageType} alert-dismissible fade show`}
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setMessage("")}
            ></button>
          </div>
        )}

        <div className="card border-primary shadow-sm mb-4">
          <div className="card-header bg-primary text-white fw-bold">
            {editingId !== null ? "Update Medicine" : "Add New Medicine"}
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Medicine Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter medicine name"
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
                    placeholder="Enter category"
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
                    min="0.01"
                    step="0.01"
                    placeholder="Enter price"
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
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="col-12 d-flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                      ? "Update Medicine"
                      : "Add Medicine"}
                  </button>

                  {editingId !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th style={{ minWidth: "160px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="spinner-border text-primary" />
                    <p className="mb-0 mt-2">Loading medicines...</p>
                  </td>
                </tr>
              ) : medicines.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No medicines found.
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => (
                  <tr key={getMedicineId(medicine)}>
                    <td>{getMedicineId(medicine)}</td>
                    <td>{medicine.name}</td>
                    <td>{medicine.category}</td>
                    <td>
                      ₹{Number(medicine.price ?? 0).toFixed(2)}
                    </td>
                    <td>{medicine.description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(medicine)}
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(medicine)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminMedicines;
