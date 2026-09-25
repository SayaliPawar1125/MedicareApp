import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/medicine";

class MedicineServices {
    
    getAllMedicines() {
        return axios.get(`${API_BASE_URL}/getAllmedicines`);
    }
}

export default new MedicineServices();
