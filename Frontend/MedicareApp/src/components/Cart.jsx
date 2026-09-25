import React, { useState, useEffect } from 'react';
import CartServices from '../services/CartServices';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    CartServices.getAllCartItems()
      .then((res) => {
        const list = res.data || [];
        setCartItems(Array.isArray(list) ? list : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cart layout items:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return; 
    
    CartServices.updateItemQuantity(id, newQty)
      .then(() => loadCart()) 
      .catch((err) => console.error("Failed to update item quantity:", err));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      CartServices.deleteCartItem(id)
        .then(() => {
          alert("Item removed successfully!");
          loadCart();
        })
        .catch((err) => console.error("Failed to delete checkout row:", err));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.medicines ? item.medicines.price : 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg border-0 p-4 bg-white bg-opacity-95 rounded-3 text-start">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success fw-bold mb-0">
            <i className="bi bi-cart3 me-2"></i>Your Shopping Basket
          </h2>
          <span className="badge bg-success px-3 py-2 rounded-pill fs-6 shadow-sm">
            Items: {cartItems.length}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading Cart...</span></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-5 text-muted fw-semibold">
            <i className="bi bi-cart-x text-muted mb-3 d-block" style={{ fontSize: "3.5rem" }}></i>
            Your shopping cart is currently empty. Visit the medical store to add medicines!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle border-light">
              <thead className="table-success text-dark">
                <tr>
                  <th scope="col" className="fw-bold">Product</th>
                  <th scope="col" className="fw-bold">Category</th>
                  <th scope="col" className="fw-bold text-end">Price</th>
                  <th scope="col" className="fw-bold text-center" style={{ width: "150px" }}>Quantity</th>
                  <th scope="col" className="fw-bold text-end">Subtotal</th>
                  <th scope="col" className="fw-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const med = item.medicines || {};
                  return (
                    <tr key={item.id}>
                      <td className="fw-semibold text-dark">{med.name || `Medicine #${item.medicineid}`}</td>
                      <td><span className="badge bg-light text-secondary border px-2 py-1">{med.category || 'General'}</span></td>
                      <td className="text-end">₹{med.price ? Number(med.price).toFixed(2) : '0.00'}</td>
                      
                      <td className="text-center">
                        <div className="input-group input-group-sm justify-content-center">
                          <button className="btn btn-outline-secondary px-2" type="button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                          <span className="input-group-text px-3 bg-white fw-bold">{item.quantity}</span>
                          <button className="btn btn-outline-secondary px-2" type="button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      
                      <td className="text-end fw-bold text-dark">
                        ₹{med.price ? (med.price * item.quantity).toFixed(2) : '0.00'}
                      </td>
                      
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" onClick={() => handleDeleteItem(item.id)}>
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                
                <tr className="table-light border-top border-dark border-opacity-10">
                  <td colSpan="4" className="text-end fw-bold fs-5 text-dark">Grand Total:</td>
                  <td className="text-end fw-bold fs-5 text-success">₹{calculateTotal().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            
            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-success fw-bold px-5 py-2 rounded-pill shadow-sm" onClick={() => alert("Proceeding to Order Checkout System...")}>
                Place Order <i className="bi bi-arrow-right-short ms-1"></i>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
