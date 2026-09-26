import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MedicineServices from '../services/MedicineServices';
import CartServices from '../services/CartServices';

function Medicines() {
  const navigate = useNavigate(); 
  const [medicineList, setMedicineList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    MedicineServices.getAllMedicines()
      .then((res) => {
        console.log("Medicine API Response:", res);
        const data = res.data || res;
        console.log("Medicine Data:", data);
        setMedicineList(
          Array.isArray(data) ? data : []
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching medicines from database:",
          err
        );
        setMedicineList([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (medicineId) => {
    console.log("Selected Medicine ID:", medicineId);
    if (!medicineId) {
      alert("Error: Missing primary product ID mapping.");
      return;
    }

    const cartItemPayload = {
      userid: 1,
      quantity: 1,
      medicines: {
        id: Number(medicineId)
      }
    };

    console.log(
      "Submitting cart insertion payload:",
      cartItemPayload
    );

    CartServices.addItemToCart(cartItemPayload)
      .then((res) => {
        console.log(
          "Cart API Response:",
          res
        );
        alert("Item added to cart successfully!");
      })
      .catch((err) => {
        console.error(
          "Cart insertion failed:",
          err
        );
        console.error(
          "Backend Response:",
          err.response?.data
        );
        console.error(
          "HTTP Status:",
          err.response?.status
        );
        alert("Failed to add item to cart.");
      });
  };

  const filteredMedicines = medicineList.filter((med) => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = med.name ? med.name.toLowerCase().includes(searchLower) : false;
    const categoryMatch = med.category ? med.category.toLowerCase().includes(searchLower) : false;
    return nameMatch || categoryMatch;
  });

  return (
    <div className="container my-4">

      <div className="card p-4 shadow-lg border-0 mb-4 bg-white bg-opacity-95 rounded-3 text-start">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="text-primary fw-bold mb-1">
              <i className="bi bi-capsule me-2 text-danger"></i>
              Medicare Pharmacy Store
            </h2>
            <p className="text-muted mb-0">
              Order authentic prescription drugs and everyday wellness supplements seamlessly.
            </p>
          </div>
          <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">
            Available Products: {filteredMedicines.length}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-white border-0 px-3">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input 
            type="text" 
            className="form-control border-0 py-2 fs-5 text-dark" 
            placeholder="Search medicines by name or health category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ outline: "none", boxShadow: "none" }}
          />
          {searchTerm && (
            <button 
              className="btn btn-white border-0 text-muted px-3" 
              type="button" 
              onClick={() => setSearchTerm("")}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading Pharmacy...
            </span>
          </div>
        </div>
      ) : filteredMedicines.length === 0 ? (
        <div className="card p-5 text-center shadow border-0 bg-white bg-opacity-95 rounded-3">
          <i
            className="bi bi-bag-x text-muted mb-3"
            style={{ fontSize: "3.5rem" }}
          ></i>
          <h4 className="text-dark fw-bold">
            No Medicines Found
          </h4>
          <p className="text-muted">
            {searchTerm ? `No results match your search text for "${searchTerm}".` : "The system could not retrieve active product inventories."}
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredMedicines.map((med) => {
            const targetId = med.id;
            return (
              <div
                className="col-md-4"
                key={targetId}
              >
                <div className="card h-100 shadow border-0 bg-white bg-opacity-95 text-start rounded-3 d-flex flex-column justify-content-between">

                  <div className="text-center pt-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success"
                      style={{
                        width: "80px",
                        height: "80px"
                      }}
                    >
                      <i
                        className="bi bi-capsule"
                        style={{
                          fontSize: "2.5rem"
                        }}
                      ></i>
                    </div>
                  </div>

                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle px-2 py-1 rounded-pill small mb-2">
                        {med.category}
                      </span>
                      <h4 className="fw-bold text-dark mb-1">
                        {med.name}
                      </h4>
                      <h3 className="text-success fw-bold my-3">
                        ₹
                        {med.price
                          ? Number(med.price).toFixed(2)
                          : "0.00"
                        }
                      </h3>
                      <hr
                        className="text-muted my-2"
                        style={{ opacity: 0.15 }}
                      />
                      <p
                        className="card-text text-muted small mt-2"
                        style={{
                          minHeight: "50px"
                        }}
                      >
                        {med.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-success w-100 fw-bold py-2 rounded-pill mt-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() => {
                        handleAddToCart(targetId);
                        navigate("/cart");
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                      Add to Cart
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Medicines;
