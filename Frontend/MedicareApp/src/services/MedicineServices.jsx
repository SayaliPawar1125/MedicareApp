
import api from "./api";

const API_BASE_URL = "/api/medicine";

class MedicineServices {
  // Get all medicines
  getAllMedicines() {
    return api.get(`${API_BASE_URL}/getAllmedicines`);
  }

  // Add a new medicine
  addMedicine(medicine) {
    return api.post(`${API_BASE_URL}/addMedicine`, medicine);
  }

  // Update an existing medicine
  updateMedicine(id, medicine) {
    return api.put(`${API_BASE_URL}/updateMedicine/${id}`, medicine);
  }

  // Delete a medicine
  deleteMedicine(id) {
    return api.delete(`${API_BASE_URL}/deleteMedicine/${id}`);
  }
}

export default new MedicineServices();
