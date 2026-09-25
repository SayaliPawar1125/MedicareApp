import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppointmentList from "./components/AppointmentList"
import AddAppointment from "./components/AddAppointment"
import Home from "./pages/Home" 
import BackgroundImage1 from'./assets/BackgroundImage1.jpg';
import Doctors from "./pages/Doctors";
import Medicines from "./pages/Medicines"
import Cart from "./components/Cart"
import TestLab from './pages/TestLab';




function App() {

  const globalBackgroundStyle = {
    backgroundImage:`url(${BackgroundImage1})`,
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
        <Navbar />
        <div className="container pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/medicines" element={<Medicines />} />
             <Route path="/testlab" element={<TestLab />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/cart" element={<Cart />} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
