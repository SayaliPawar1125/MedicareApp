import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/labtests"; 

class LabTestServices {
    
    getAllLabTests() {
        return axios.get(`${API_BASE_URL}`);
    }

    getLabTestById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }
}

export default new LabTestServices();
