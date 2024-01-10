import React, { useState, useEffect } from "react";
import Loading from "../../componets/Loader/Loading";
import { BASE_URL, token } from "../../config";
import Error from "../../componets/Error/Error";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const MyBookings = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime);
    const formattedDate = date.toLocaleDateString(); // Format the date (modify as needed)
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format the time
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/my-appointments/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading && !error) {
    return <Loading />;
  }

  if (error && !loading) {
    return <Error errMessage={error} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
      {appointments.map((appointment) => (
        <div key={appointment._id} className="border p-4 rounded-md shadow-lg">
          <div className="flex items-center mb-3">
            <img
              src={appointment.doctorDetails[0].photo}
              alt={appointment.doctorDetails[0].name}
              className="w-16 h-16 rounded-full mr-3"
            />
            <div>
              <p className="font-bold text-xl">
                {appointment.doctorDetails[0].name}
              </p>
              <p className="text-gray-500">
                {appointment.doctorDetails[0].qualifications[0].degree}
              </p>
            </div>
          </div>
          <p className="text-gray-500 mb-3">
            Appointment Date: {formatDateTime(appointment.appointmentDate)}
          </p>
          <p>Ticket Price: {appointment.ticketPrice}</p>
          <p>Status: {appointment.status}</p>
          <Link
            to={`/doctors/${appointment._id}`}
            className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
            flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
