
import api from "./api";

const API_BASE_URL = "/api/orders";
class OrderServices {
  getAllOrders() {
    return api.get(`${API_BASE_URL}/getAllOrders`);
  }

  getOrderById(id) {
    return api.get(`${API_BASE_URL}/getOrder/${id}`);
  }

  cancelOrder(id) {
    return api.delete(`${API_BASE_URL}/cancelorder/${id}`);
  }
}

export default new OrderServices();
