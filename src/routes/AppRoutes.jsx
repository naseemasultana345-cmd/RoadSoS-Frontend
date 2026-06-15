import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash/Splash";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Hospitals from "../pages/Hospitals/Hospitals";
import Ambulance from "../pages/Ambulance/Ambulance";
import Police from "../pages/Police/Police";
import Rescue from "../pages/Rescue/Rescue";
import MySOS from "../pages/MySOS/MySOS";

// 🔥 ADMIN IMPORTS (ADD THESE)
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/police" element={<Police />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/profile" element={<Profile />} />

        {/* 🔥 ADMIN ROUTES (ADDED) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/editprofile" element={<EditProfile />}/>
        <Route
  path="/mysos"
  element={<MySOS />}
/>

      </Routes>

    </BrowserRouter>

  );
}

export default AppRoutes;