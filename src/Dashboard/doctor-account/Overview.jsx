import React from "react";
import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../config";
import { IoIosWarning } from "react-icons/io";
import startIcon from "../../assets/images/Star.png";

const Overview = ({ userData }) => {
  return (
    <div>
      <div className=" px-2 bg-yellow-100 text-sm whitespace-nowrap ">
        <span className="pr-10 bg-yellow-100 inline-flex items-center">
          <IoIosWarning className="text-black-100" />
          <p className="ml-1">
            To get approval please complete your profile. We'll review manually
            and approve within 3 days.
          </p>
        </span>
      </div>
      <div className="flex  justify-between py-8">
        <img
          src={userData.photo}
          alt=""
          className="w-40 h- rounded border-2 border-solid border-primaryColor "
        />

        <div className="flex-col px-6 py-3">
          <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
            Surgeon
          </span>
          <h2 className="text-[16px] lg:text-[26px] font-bold mt-3 lg:mt-5 truncate">
            {userData.name}
          </h2>

          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={startIcon} alt="" /> 4.5
          </span>
        </div>
      </div>
      <div className="flex-col ">
        <h3
          className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center
        gap-2 "
        >
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9"></span>
          <p className="text-irisBlueColor font-bold text-[24px] mr-4">
            {" "}
            {userData.about}
          </p>
        </h3>
        <h3
          className="py-8 text-[20px] leading-[30px] text-headingColor font-semibold flex items-center
        gap-2"
        >
          Education
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {userData.qualifications && userData.qualifications.length > 0 ? (
              userData.qualifications.map((qualification, index) => (
                <p
                  key={index}
                  className="text-irisBlueColor font-bold text-[24px] mr-4"
                >
                  {qualification.degree}
                </p>
              ))
            ) : (
              <p>No education details available</p>
            )}
          </span>
        </h3>
        <h3
          className="py-8 text-[20px] leading-[30px] text-headingColor font-semibold flex items-center
        gap-2"
        >
          experiences
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {userData.experiences && userData.experiences.length > 0 ? (
              userData.experiences.map((experiences, index) => (
                <p
                  key={index}
                  className="text-irisBlueColor font-bold text-[24px] mr-4"
                >
                  {experiences.year}
                </p>
              ))
            ) : (
              <p>No experiences details available</p>
            )}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Overview;
