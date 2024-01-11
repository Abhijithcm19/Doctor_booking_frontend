import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors`);
        setDoctorData(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const sortedDoctors = doctorData.sort((a, b) => b.averageRating - a.averageRating);

  const topThreeDoctors = sortedDoctors.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {topThreeDoctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
