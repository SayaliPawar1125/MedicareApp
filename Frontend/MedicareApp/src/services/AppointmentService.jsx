import api from "./api";

const API_BASE_URL = "/api/appointment";

class AppointmentService {

    getAllAppointments() {
        return api.get(
            `${API_BASE_URL}/getappointments`
        );
    }

    saveAppointment(appointmentData) {
        return api.post(
            `${API_BASE_URL}/saveappointment`,
            appointmentData
        );
    }


     // Update appointment status
    updateAppointmentStatus(id, status) {
        return api.put(
            `${API_BASE_URL}/status/${id}`,
            null,
            {
                params: { status }
            }
        );
    }
}


export default new AppointmentService();