import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import AdminRoute from "./components/AdminRoutes"
import AppointmentList from "./components/AppointmentList"
import AddAppointment from "./components/AddAppointment"
import Home from "./pages/Home"
import BackgroundImage1 from './assets/BackgroundImage1.jpg';
import Doctors from "./pages/Doctors";
import Medicines from "./pages/Medicines"
import Cart from "./components/Cart"
import LabTests from "./pages/LabTests"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctors from "./pages/AdminDoctor"
import AdminMedicines from "./pages/AdminMedicines";
import AdminLabTests from "./pages/AdminLabTests";
import AdminNavbar from "./components/AdminNavbar";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const role = localStorage.getItem("userRole");

  const globalBackgroundStyle = {
    backgroundImage: `url(${BackgroundImage1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    paddingTop: "90px"
  };

  return (
    <BrowserRouter>

      <div style={globalBackgroundStyle}>
        {role === "ADMIN" ? <AdminNavbar /> : <Navbar />}
        <div className="container pb-5">

          <Routes>
            {/* Public and user routes */}
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/labtest" element={<LabTests />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route
                path="/appointments"
                element={<AppointmentList />}
              />

              <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin-doctors"
                element={<AdminDoctors />}
              />

              <Route
                path="/admin-medicines"
                element={<AdminMedicines />}
              />

            </Route>

            <Route element={<AdminRoute />}>
              <Route
                path="/admin-labtests"
                element={<AdminLabTests />}
              />

              <Route path="/admin-orders" element={<AdminOrders />} />
            </Route>
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App


