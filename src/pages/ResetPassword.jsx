import React, { useState } from "react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {
  const { email } = useParams();

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/resetpassword`,
        {
          email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      if (response.data.msg === "Password reset successfully") {
        toast.success("Password reset successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.error || "Server error occurred");
      } else {
        toast.error("Internal server error");
      }
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/resendOTP`, {
        email,
      });

      if (response.data.msg === "OTP sent to your email") {
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Internal server error");
      }
    }

    setLoading(false);
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Enter 🔐Your{" "}
          <span className="text-primaryColor">OTP and New Password</span>
        </h3>

        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus: border-b-primaryColor
             text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus: border-b-primaryColor
             text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus: border-b-primaryColor
             text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={25} color="#fff" />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            <span
              className="text-primaryColor font-medium ml-1 cursor-pointer"
              onClick={handleResendOTP}
            >
              Resend OTP
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
