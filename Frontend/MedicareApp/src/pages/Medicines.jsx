import React, { useState, useEffect } from 'react';
import MedicineServices from '../services/MedicineServices';
import CartServices from '../services/CartServices';

function Medicines() {

  const [medicineList, setMedicineList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all medicines from backend
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


  // Add medicine to cart
  const handleAddToCart = (medicineId) => {

    console.log("Selected Medicine ID:", medicineId);

    // Check medicine ID
    if (!medicineId) {

      alert("Error: Missing primary product ID mapping.");

      return;
    }


    // Payload according to CartItem.java
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


    // Call backend API
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


  return (

    <div className="container my-4">


      {/* Pharmacy Header */}

      <div className="card p-4 shadow-lg border-0 mb-5 bg-white bg-opacity-95 rounded-3 text-start">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <h2 className="text-primary fw-bold mb-1">

              <i className="bi bi-capsule me-2 text-danger"></i>

              Medicare Pharmacy Store

            </h2>


            <p className="text-muted mb-0">

              Order authentic prescription drugs and everyday
              wellness supplements seamlessly.

            </p>

          </div>


          <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow-sm">

            Available Products: {medicineList.length}

          </span>

        </div>

      </div>


      {/* Loading */}

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


      ) : medicineList.length === 0 ? (


        /* No Medicines */

        <div className="card p-5 text-center shadow border-0 bg-white bg-opacity-95 rounded-3">

          <i
            className="bi bi-bag-x text-muted mb-3"
            style={{ fontSize: "3.5rem" }}
          ></i>


          <h4 className="text-dark fw-bold">

            No Medicines Found

          </h4>


          <p className="text-muted">

            The system could not retrieve active product inventories.

          </p>

        </div>


      ) : (


        /* Medicine List */

        <div className="row g-4">

          {medicineList.map((med) => {


            // Medicine primary key from backend
            const targetId = med.id;


            console.log(
              "Medicine:",
              med,
              "Medicine ID:",
              targetId
            );


            return (

              <div
                className="col-md-4"
                key={targetId}
              >

                <div className="card h-100 shadow border-0 bg-white bg-opacity-95 text-start rounded-3 d-flex flex-column justify-content-between">


                  {/* Medicine Icon */}

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


                  {/* Medicine Details */}

                  <div className="card-body p-4 d-flex flex-column justify-content-between">

                    <div>


                      {/* Category */}

                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle px-2 py-1 rounded-pill small mb-2">

                        {med.category}

                      </span>


                      {/* Medicine Name */}

                      <h4 className="fw-bold text-dark mb-1">

                        {med.name}

                      </h4>


                      {/* Price */}

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


                      {/* Description */}

                      <p
                        className="card-text text-muted small mt-2"
                        style={{
                          minHeight: "50px"
                        }}
                      >

                        {med.description}

                      </p>

                    </div>


                    {/* Add To Cart Button */}

                    <button
                      type="button"
                      className="btn btn-outline-success w-100 fw-bold py-2 rounded-pill mt-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() =>
                        handleAddToCart(targetId)
                      }
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