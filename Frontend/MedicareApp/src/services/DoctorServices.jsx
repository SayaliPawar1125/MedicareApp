import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/doctor";

class DoctorServices {
    
    getAllDoctors() {
        return axios.get(`${API_BASE_URL}/getAlldoctors`);
    }

    getDoctorById(id) {
        return axios.get(`${API_BASE_URL}/getDoctorById/${id}`);
    }

    getDoctorBySpec(spec) {
        return axios.get(`${API_BASE_URL}/getDoctorBySpec/${spec}`);
    }

    saveDoctor(doctorData) {
        return axios.post(`${API_BASE_URL}/savedoctor`, doctorData);
    }

    updateDoctor(id, doctorData) {
        return axios.put(`${API_BASE_URL}/updateDoctor/${id}`, doctorData);
    }

    deleteDoctor(id) {
        return axios.delete(`${API_BASE_URL}/deleteDoctor/${id}`);
    }
}

export default new DoctorServices();
