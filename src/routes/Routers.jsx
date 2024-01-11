import { Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctor/Doctors";
import DoctorDetails from "../pages/Doctor/DoctorDetails";
import Otp from "../pages/Otp";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ErrorBoundary } from "react-error-boundary";
import UserOutlet from "../pages/useroutlet/userOutlet";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import NotificationPage from "../pages/NotificationPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ServiceDocList from "../componets/Services/ServiceDocList";
import { authContext } from "../context/AuthContext";

const Routers = () => {
  const { user, token } = useContext(authContext);

  return (
    <Routes>
      <Route path="/" element={<UserOutlet />}>
        <Route index element={<Home />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:id" element={<DoctorDetails />} />
        {!user && (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="forgot/password" element={<ForgotPassword />} />
            <Route path="reset/password/:email" element={<ResetPassword />} />
            <Route path="otp" element={<Otp />} />
          </>
        )}
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="doctors/services/:id" element={<ServiceDocList />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="notification" element={<NotificationPage />} />
        {user && (
          <>
            <Route
              path="users/profile/me"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctors/profile/me"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default Routers;
