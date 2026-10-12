
import { useEffect, useMemo, useState } from "react";
import OrderServices from "../services/OrderServices";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await OrderServices.getAllOrders();
      const data = response.data;

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data?.content)) {
        setOrders(data.content);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);
      setError(
        "Unable to load orders. Check the API response and admin permissions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      const id = String(order.id ?? order.order_id ?? "");
      const userId = String(order.userid ?? order.user?.id ?? "");
      const customerName = order.user?.name ?? "";
      const status = order.status ?? "";
      const paymentStatus = order.paymentstatus ?? "";

      const matchesSearch = [
        id,
        userId,
        customerName,
        status,
        paymentStatus,
      ].some((value) => String(value).toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "All" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const formatPrice = (amount) =>
    Number(amount ?? 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleString("en-IN");
  };

  const getStatusClass = (status) => {
    switch (String(status ?? "").toLowerCase()) {
      case "delivered":
      case "completed":
      case "paid":
        return "bg-success";
      case "pending":
      case "processing":
        return "bg-warning text-dark";
      case "cancelled":
      case "failed":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalamount ?? 0),
    0
  );

  const orderStatuses = [
    "All",
    ...new Set(orders.map((order) => order.status).filter(Boolean)),
  ];

  return (
    <div className="container py-4 mb-5">
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-primary mb-1">
              <i className="bi bi-cart-check me-2"></i>
              Admin Orders
            </h2>
            <p className="text-muted mb-0">
              View customer orders and payment information.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={fetchOrders}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            type="button"
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchOrders}
          >
            Retry
          </button>
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-receipt fs-3 text-primary"></i>
            <h3 className="fw-bold mt-2 mb-1">{orders.length}</h3>
            <span className="text-muted">Total Orders</span>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-currency-rupee fs-3 text-success"></i>
            <h4 className="fw-bold mt-2 mb-1">
              {formatPrice(totalRevenue)}
            </h4>
            <span className="text-muted">Total Order Value</span>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <i className="bi bi-hourglass-split fs-3 text-warning"></i>
            <h3 className="fw-bold mt-2 mb-1">
              {
                orders.filter(
                  (order) =>
                    String(order.status ?? "").toLowerCase() === "pending"
                ).length
              }
            </h3>
            <span className="text-muted">Pending Orders</span>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h4 className="fw-bold mb-0">Order Records</h4>

          <div className="d-flex flex-wrap gap-2">
            <input
              type="search"
              className="form-control"
              style={{ maxWidth: "280px" }}
              placeholder="Search order, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search orders"
            />

            <select
              className="form-select"
              style={{ maxWidth: "200px" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter orders by status"
            >
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox display-4"></i>
            <h5 className="mt-3">No orders found</h5>
            <p className="mb-0">
              Try another search or check whether orders exist in the database.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order, index) => {
                  const id = order.id ?? order.order_id ?? index;
                  const customer =
                    order.user?.name ??
                    (order.userid != null
                      ? `User #${order.userid}`
                      : order.user?.id != null
                        ? `User #${order.user.id}`
                        : "—");

                  return (
                    <tr key={id}>
                      <td className="fw-semibold">#{id}</td>
                      <td>{customer}</td>
                      <td className="fw-semibold text-success">
                        {formatPrice(order.totalamount)}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusClass(order.status)}`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusClass(order.paymentstatus)}`}
                        >
                          {order.paymentstatus || "Unknown"}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
