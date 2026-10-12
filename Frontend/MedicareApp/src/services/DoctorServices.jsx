import api from "./api";

const API_BASE_URL = "/api/doctor";

class DoctorServices {

    getAllDoctors() {
        return api.get(
            `${API_BASE_URL}/getAlldoctors`
        );
    }

    getDoctorById(id) {
        return api.get(
            `${API_BASE_URL}/getDoctorById/${id}`
        );
    }

    getDoctorBySpec(spec) {
        return api.get(
            `${API_BASE_URL}/getDoctorBySpec/${spec}`
        );
    }

    saveDoctor(doctorData) {
        return api.post(
            `${API_BASE_URL}/savedoctor`,
            doctorData
        );
    }

    updateDoctor(id, doctorData) {
        return api.put(
            `${API_BASE_URL}/updateDoctor/${id}`,
            doctorData
        );
    }

    deleteDoctor(id) {
        return api.delete(
            `${API_BASE_URL}/deleteDoctor/${id}`
        );
    }
}

export default new DoctorServices();