import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { BASE_URL } from "../config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!otpValue || !emailRegex.test(otpValue)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/forgotPassword`,
        {
          email: otpValue,
        }
      );

      if (response.data.msg === "OTP sent to your email") {
        toast.success("OTP sent successfully!");
        navigate(`/reset/password/${otpValue}`);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Internal server error");
      }
    }

    setIsLoading(false);
  };

  return (
    <div>
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Enter 🔐Your <span className="text-primaryColor">email</span>
          </h3>

          <form className="py-4 md:py-0" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Enter Your Email"
                name="email"
                value={otpValue}
                onChange={handleOtpChange}
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                {isLoading ? (
                  <HashLoader color="#fff" loading={isLoading} size={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
