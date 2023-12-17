import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Otp = () => {
  const [otpValue, setOtpValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };

  const validateForm = () => {
    if (!otpValue) {
      toast.error('Please enter the OTP');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const formData = { otp: otpValue }; // Create a formData object
      const res = await fetch(`${BASE_URL}/api/v1/auth/verify-otp`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData with OTP
      });

      if (!res.ok) {
        const { error } = await res.json(); // Error message is provided as 'error'
        throw new Error(error);
      }

      setLoading(false);
      toast.success("OTP verified successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP");
      setLoading(false);
    }
  };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          OTP 🔐 <span className='text-primaryColor'>Verification</span>
        </h3>

        <form className='py-4 md:py-0' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <input
              type="text"
              placeholder='Enter Your OTP'
              name='otp'
              value={otpValue}
              onChange={handleOtpChange}
              className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
            />
          </div>

          <div className='mt-7'>
            <button
              type='submit'
              className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
            >
              Submit
            </button>
          </div>

          <p className='mt-5 text-textColor text-center'>
            <Link to='#' className='text-primaryColor font-medium ml-1'>
              Resend OTP
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Otp;
