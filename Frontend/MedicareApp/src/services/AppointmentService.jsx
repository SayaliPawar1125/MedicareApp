import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/appointment";
const appointmentData = {
  appointmentdate: "2026-10-15",
  timeslot: "10:00 AM - 11:00 AM",
  paymentstatus: "Pending" 
};
class AppointmentService
{
    getAllAppointments()
    {
      return  axios.get(API_BASE_URL+"/getappointment")
    }

    getAllAppointments() {
        return axios.get(API_BASE_URL + "/getappointments");
    }

    
    saveAppointment(appointmentData) {
        return axios.post(API_BASE_URL + "/saveappointment", appointmentData);
    }

}

export default new AppointmentService();