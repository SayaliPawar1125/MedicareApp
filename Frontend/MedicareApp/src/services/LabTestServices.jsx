
import api from "./api";

const API_BASE_URL = "/api/labtests";

class LabTestServices {
  getAllLabTests() {
    return api.get(`${API_BASE_URL}/getAlllabtest`);
  }

  getLabTestById(id) {
    return api.get(`${API_BASE_URL}/${id}`);
  }

  addLabTest(labTest) {
    return api.post(`${API_BASE_URL}/add`, labTest);
  }

  updateLabTest(id, labTest) {
    return api.put(`${API_BASE_URL}/update/${id}`, labTest);
  }

  deleteLabTest(id) {
    return api.delete(`${API_BASE_URL}/delete/${id}`);
  }
}

export default new LabTestServices();
