import React, { useState, useEffect } from "react";
import DoctorCard from "../Doctors/DoctorCard";
import { BASE_URL, token } from "../../config";
import { useParams } from "react-router-dom";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error.jsx";

const ServiceDocList = () => {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors/services/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDoctorData(data.doctors || []);
          setLoading(false);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctorData && doctorData.length > 0 ? (
        doctorData.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
      ) : (
        <p>No doctors found</p>
      )}
    </div>
  );
};

export default ServiceDocList;
