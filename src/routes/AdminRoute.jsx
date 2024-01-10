import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/adminLogin";
import AdminHome from "../pages/Admin/adminHome";
import AdminOutlet from "../pages/Admin/adminOulet/adminOutlet";
import UserList from "../pages/Admin/userList";
import DoctorList from "../pages/Admin/doctorList";
import AddServices from "../pages/Admin/addServices";
import Booking from "../pages/Admin/booking";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminOutlet />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserList />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="services" element={<AddServices />} />
        <Route path="bookings" element={<Booking />} />
      </Route>
      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoute;
