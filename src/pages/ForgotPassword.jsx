import React from 'react'
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config.js";
import { HashLoader } from "react-spinners";



const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
      });
    
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const { dispatch } = useContext(authContext);
    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const submitHandler = async (event) => {
        event.preventDefault();
      }
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          <span className="text-primaryColor"></span> 
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder=" New Password"
              name="password"
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
              value={formData.password}
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
              {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ForgotPassword