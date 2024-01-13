import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { authContext } from "./../../context/AuthContext";
import { BASE_URL } from "../../config";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error";
import axios from "axios";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors/${id}`);
        setDoctorDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [id]);
  console.log("doc detailzzzzzzzz", doctorDetails);
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            {doctorDetails ? (
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={doctorImg} alt="" className="w-full" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {doctorDetails.qualifications[0].degree}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {doctorDetails.name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {doctorDetails.averageRating}
                    </span>
                    <span className="text-[14px] leading-4 lg:text-[16px] lg:leading-7 font-semibold">
                      ({doctorDetails.totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            ) : (
              <Loading />
            )}

            <div className="mt-[50px] border-b border-solid border-[#0066ff34] ">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about"
                    ? "border-b border-solid border-primaryColor"
                    : ""
                } 
                  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback"
                    ? "border-b border-solid border-primaryColor"
                    : ""
                } 
                  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorAbout doctorDetails={doctorDetails} />}
              {tab === "feedback" && <Feedback doctorDetails={doctorDetails} />}
            </div>
          </div>
          <SidePanel doctorDetails={doctorDetails} />
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
