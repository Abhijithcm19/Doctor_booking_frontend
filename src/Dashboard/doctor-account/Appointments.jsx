import React, { useState, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import startIcon from "../../assets/images/Star.png";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error.jsx";
import { BASE_URL, token } from "../../config";
import axios from "axios";

const Appointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("appointments",appointments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/doctors/my-appointments/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );

        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);
  if (loading && !error) {
    return <Loading />;
  }

  if (error && !loading) {
  }
  return (
    <div>
      <div className=" px-3 bg-yellow-100 text-sm whitespace-nowrap ">
        <span className="pr-10 bg-yellow-100 inline-flex items-center">
          <IoIosWarning className="text-black-100" />
          <p className="ml-1">
            To get approval please complete your profile. We'll review manually
            and approve within 3 days.
          </p>
        </span>
      </div>
      <div className="py-10">
        <table className="table-auto w-full">
          <thead className="">
            <tr>
              <th className="px-8 py-1 bg-gray-100">NAME</th>
              <th className="px-8 py-1 bg-gray-100">GENDER</th>
              <th className="px-8 py-1 bg-gray-100">PAYMENT</th>
              <th className="px-10 py-1 bg-gray-100">PRICE</th>
              <th className="px-10 py-1 bg-gray-100 whitespace-nowrap">
                BOOKED ON
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-8 py-1">{appointment.userDetails[0].name}</td>
                <td className="px-8 py-1">
                  {appointment.userDetails[0].gender}
                </td>
                <td className="px-8 py-1">{appointment.status}</td>
                <td className="px-10 py-1">{appointment.ticketPrice}</td>
                <td className="px-10 py-1">
                  {`${new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()} ${new Date(
                    appointment.appointmentDate
                  ).toLocaleTimeString()}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
